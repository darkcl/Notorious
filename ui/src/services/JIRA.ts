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
      headers: headers
    });

    const data = await res.json();
    return data;
  }

  public async getDevelopmentStatus(issueId: string): Promise<any> {
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
        headers: headers
      }
    );

    const data = await res.json();
    return data;
  }
}
