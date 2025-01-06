const { execSync } = require("child_process");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Function to get the current branch name
function getBranchName() {
  try {
    const branchName = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();
    return branchName;
  } catch (error) {
    console.error("Error getting branch name:", error);
    return null;
  }
}
const branchName = getBranchName();

// Function to get the list of changed files in the latest commit
function getChangedFiles() {
  try {
    // Get changed files from the last commit
    const result = execSync("git diff --name-only HEAD~1 HEAD").toString();
    // Split the result into an array of file paths
    return result.split("\n").filter((file) => file); // Filter out any empty entries
  } catch (error) {
    console.error("Error getting changed files:", error.message);
    return [];
  }
}
const files = getChangedFiles();

// Function to read file contents
async function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

//Function to get the commit information
function getCommitInfo() {
  const commitInfo = {
    commitHash: "Unknown",
    commitMessage: "Unknown",
    authorName: "Unknown",
    authorEmail: "Unknown",
    category: "Common",
  };
  try {
    // Get the latest commit hash short
    commitInfo.commitHash = execSync("git rev-parse --short HEAD")
      .toString()
      .trim();

    // Get the latest commit message
    const commitMessage = execSync("git log -1 --pretty=%B").toString().trim();
    commitInfo.commitMessage = commitMessage;

    // Get the commit author's name
    commitInfo.authorName = execSync("git log -1 --pretty=%an")
      .toString()
      .trim();

    // Get the commit author's email
    commitInfo.authorEmail = execSync("git log -1 --pretty=%ae")
      .toString()
      .trim();

    // Categorize the commit using commit message
    if (commitMessage.toLowerCase().includes("be"))
      commitInfo.category = "Backend";
    if (commitMessage.toLowerCase().includes("fe"))
      commitInfo.category = "Frontend";
    if (commitMessage.toLowerCase().includes("merge"))
      commitInfo.category = "Merge Request";

    return commitInfo;
  } catch (error) {
    console.error("Error retrieving commit info:", error);
    return commitInfo;
  }
}

// Function to write the feedback to a JSON file in the root directory of the project
function writeToReviewFile(response) {
  const feedback = response.data.choices[0].message.content;
  const created = response.data.created;
  const { category, commitHash, authorEmail, authorName, commitMessage } =
    getCommitInfo();

  // Prepare data to be written as JSON
  const feedbackData = {
    commitHash: commitHash,
    category: category,
    feedback: feedback,
    commitMessage,
    branchName,
    files,
    authorName,
    authorEmail,
    created,
    createdAt: new Date().getTime(),
  };

  // Get the root directory path and append the filename
  const feedbackPath = path.join(process.cwd(), "ai-review-feedback.json");

  try {
    // Read existing feedback data if the file exists
    let existingData = [];
    if (fs.existsSync(feedbackPath)) {
      const rawData = fs.readFileSync(feedbackPath, "utf8");
      existingData = JSON.parse(rawData); // Parse existing file content
    }

    // Append new feedback to existing data
    existingData.push(feedbackData);

    // Write updated data back to the file, ensuring valid JSON array
    fs.writeFileSync(
      feedbackPath,
      JSON.stringify(existingData, null, 2),
      "utf8"
    );
    console.log(`\nAI Feedback saved to ${feedbackPath}`);
  } catch (error) {
    console.error("Error writing to review file:", error);
  }
}

// Function to summarize code files using Hugging Face
async function summarizeFiles() {
  try {
    if (files.length === 0) {
      console.log("No files have been changed in the last commit.");
      return;
    }

    let fileContents = "";
    for (let file of files) {
      // Read the content of each file (only if the file exists)
      if (fs.existsSync(file)) {
        const content = await readFile(file);
        fileContents += `\nFile: ${file}\n${content}\n`;
      }
    }

    if (!fileContents) {
      console.log("No content to summarize.");
      return;
    }

    console.log("Reviewing code changes with AI...");

    // Send the combined content to the Hugging Face model for summarization
    const response = await axios.post(
      // "https://api-inference.huggingface.co/models/google/gemma-2-2b-it/v1/chat/completions",
      "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct/v1/chat/completions",
      {
        // model: "google/gemma-2-2b-it",
        model: "microsoft/Phi-3-mini-4k-instruct",
        messages: [
          {
            role: "user",
            content: `Summarize the file functionalities within 30 words for each file without technical explanantion and not more than 300 words collectively. here is File changes \n\n${fileContents}`,
          },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HF_API_KEY}`,
        },
      }
    );
    writeToReviewFile(response);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

// Run the function to summarize files
summarizeFiles();