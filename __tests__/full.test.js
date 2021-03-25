const file = require("../data/full_husn_muslim_ar.json");

describe("should parent props", () => {
  it("should props defined & filled", () => {
    const keys = [
      "ID",
      "TITLE",
      "TEXT",
      "AUDIO_URL",
      "AUDIO_LOCAL_URL",
      "children",
    ];
    file.forEach((f) => {
      keys.forEach((key) => {
        expect(f[key]).toBeDefined();
        expect(f[key]).toBeTruthy();
      });
    });
  });

  it("should props with exact types", () => {
    file.forEach((f) => {
      expect(typeof f.TITLE).toBe("string");

      expect(typeof f.ID).toBe("number");

      expect(typeof f.TEXT).toBe("string");
      expect(f.TEXT.startsWith("http")).toBeTruthy();

      expect(typeof f.AUDIO_URL).toBe("string");
      expect(f.AUDIO_URL.startsWith("http")).toBeTruthy();

      expect(Array.isArray(f.children)).toBeTruthy();
    });
  });

  it("should children not empty", () => {
    file.forEach((f) => {
      expect(f.children.length).toBeGreaterThan(0);
    });
  });
});

describe("should children props", () => {
  it("should props defined & filled", () => {
    const keys = ["ID", "TITLE", "AUDIO_URL"];
    file.forEach((f) => {
      keys.forEach((key) => {
        expect(f[key]).toBeDefined();
        expect(f[key]).toBeTruthy();
      });
    });
  });

  it("should children props with the exact types", () => {
    file.forEach((f) => {
      f.children.forEach((c) => {
        expect(typeof c.ID).toBe("number");
        expect(typeof c.ARABIC_TEXT).toBe("string");
        expect(typeof c.AUDIO_URL).toBe("string");

        expect(c.AUDIO_URL.startsWith("http")).toBeTruthy();
      });
    });
  });
});
