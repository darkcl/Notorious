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
