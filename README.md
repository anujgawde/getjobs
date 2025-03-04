# GetJobs

## Overview

GetJobs is a job search tool that allows users to filter LinkedIn job postings based on specific criteria. It scrapes job listings from LinkedIn after retrieving data from their API and provides users with an Excel file containing job details. Users can preview the file before downloading it if they find it useful.

## Table of Contents

- How it works
- Features
  - Job Search and Filtering
  - Excel Job Report
  - User Verification
- Technology Stack
- Getting Started
  - Prerequisites
  - Installation
- Future Enhancements
- Contribution
- Stay in Touch

## How it works

### Steps to Use

1.  Enter an email on the home page.
2.  A verification email is sent (currently from a private email `abc@gmail.com`).
3.  Click on the verification link to be redirected to the jobs page.
4.  Use the search bar to filter jobs based on:
    - Keyword
    - Location
    - Experience Level
    - Date Posted
    - Salary
    - Work Mode (Remote, Hybrid, On-Site)
    - Job Type
5.  Fetch job listings matching the applied filters.
6.  Preview the Excel report.
7.  If useful, download the file for further reference.

## Features

### Job Search and Filtering

- Search for jobs based on specific criteria.
- Apply multiple filters to refine job listings.

### Excel Job Report

- Generates an Excel file with job details:
  - Job ID
  - Job Title
  - Company
  - Location
  - Date Posted
  - Salary
  - Job Link
- Users can preview and download the report.

### User Verification

- Ensures access only to verified users via email confirmation.
- Redirects verified users to the job search page.

## Technology Stack

- **Frontend**: Next.js

## Getting Started

### Prerequisites

- Node.js installed in your system.

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/anujgawde/getjobs.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd getjobs
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Start the application:

    ```bash
    npm run dev
    ```

## Future Enhancements

- Implementing authentication with OAuth providers.
- Storing job searches for analytics and insights.
- Adding support for multiple job listing platforms.

## Contribution

1.  Fork the repository.
2.  Create a new branch for your feature:

    ```bash
    git checkout -b feature-name
    ```

3.  Commit your changes:

    ```bash
    git commit -m "Add feature description"
    ```

4.  Push to the branch:

    ```bash
    git push origin feature-name
    ```

5.  Open a pull request.

## Stay in Touch

- Author - [Anuj Gawde](https://x.com/axgdevv)
