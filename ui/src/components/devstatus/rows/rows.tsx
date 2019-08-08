import * as React from "react";

interface Author {
  name: string;
  avatar: string;
}

interface Reviewer {
  name: string;
  avatar: string;
  approved: boolean;
}

interface Source {
  branch: string;
  url: string;
}

interface Destination {
  branch: string;
  url: string;
}

interface PullRequest {
  author: Author;
  id: string;
  name: string;
  commentCount: number;
  source: Source;
  destination: Destination;
  reviewers: Reviewer[];
  status: string;
  url: string;
  lastUpdate: Date;
}

interface Repository {
  name: string;
  avatar: string;
  url: string;
  commits: any[];
}

interface LastCommit {
  id: string;
  displayId: string;
  authorTimestamp: Date;
  merge: boolean;
  files: any[];
}

interface Branch {
  name: string;
  url: string;
  createPullRequestUrl: string;
  repository: Repository;
  lastCommit: LastCommit;
}

export const PullRequestRows = (pullRequests: PullRequest[]) =>
  pullRequests.map((pr: PullRequest, index: number) => ({
    key: `row-${index}-${pr.id}`,
    cells: [
      {
        key: pr.name,
        content: <a href={pr.url}>{pr.name}</a>
      },
      {
        key: pr.author.name,
        content: pr.author.name
      }
    ]
  }));

export const BranchRows = (branches: Branch[]) =>
  branches.map((branch: Branch, index: number) => ({
    key: `row-${index}-${branch.name}`,
    cells: [
      {
        key: branch.name,
        content: <a href={branch.url}>{branch.name}</a>
      },
      {
        key: branch.repository.name,
        content: <a href={branch.repository.url}>{branch.repository.name}</a>
      }
    ]
  }));
