const assertUrl = (str: string): null | TypeError => {
  if (URL.canParse(str)) {
    return null;
  }

  throw new TypeError("Failed to construct 'URLManager': Invalid URL");
};

export class URLManager {
  private url: URL;

  constructor(baseUrl = "") {
    assertUrl(baseUrl);
    this.url = new URL(baseUrl);
  }

  addPathParam(params: Record<string, string>): URLManager {
    for (const [key, value] of Object.entries(params)) {
      const regex = new RegExp(`/:${key}\\b`, "g");
      this.url = new URL(
        this.url.toString().replace(regex, `/${value}`),
      );
    }
    return this;
  }

  addSearchParams(params: Record<string, string>): URLManager {
    for (const [key, value] of Object.entries(params)) {
      this.url.searchParams.set(key, value);
    }
    return this;
  }

  // Get all query parameters as an object
  convertSearchParamInObject(): Record<string, string> {
    const searchPrm: Record<string, string> = {};
    this.url.searchParams.forEach((value, key) => {
      return (searchPrm[key] = value);
    });
    return searchPrm;
  }

  clearSearchParams(): URLManager {
    this.url.searchParams.forEach((value, key) => {
      return this.url.searchParams.delete(key, value);
    });

    return this;
  }
}
