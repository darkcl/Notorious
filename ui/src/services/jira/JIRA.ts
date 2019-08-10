export class JIRAError extends Error {
  public contenxt: any;
  constructor(message?: string) {
    super(message);
  }
}

export class JIRA {
  constructor(
    private host: string,
    private user: string,
    private token: string
  ) {}

  public async getIssue(issueKey: string): Promise<any> {
    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(this.user + ":" + this.token).toString("base64")
    );

    const res = await fetch(`${this.host}/rest/api/3/issue/${issueKey}`, {
      method: "GET",
      headers
    });

    if (res.status >= 400 && res.status < 600) {
      const err = new JIRAError("Bad Response from server");

      try {
        err.contenxt = await res.json();
      } catch (e) {}
      throw err;
    }

    const data = await res.json();
    return data;
  }

  public async getDevelopmentStatus(issueId: string): Promise<any> {
    if (issueId !== undefined) {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Basic " + Buffer.from(this.user + ":" + this.token).toString("base64")
      );

      const res = await fetch(
        `${
          this.host
        }/rest/dev-status/1.0/issue/detail?issueId=${issueId}&applicationType=bitbucket&dataType=pullrequest`,
        {
          method: "GET",
          headers
        }
      );

      if (res.status >= 400 && res.status < 600) {
        const err = new JIRAError("Bad Response from server");

        try {
          err.contenxt = await res.json();
        } catch (e) {}
        throw err;
      }

      const data = await res.json();
      return data;
    } else {
      throw "issueId must not be undefined";
    }
  }
}
