const file = require(`../data/full_husn_muslim_ar.json`);

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
    file.forEach((f, fIndex) => {
      f.children.forEach((c, cIndex) => {
        try {
          expect(typeof c.ID).toBe("number");
          expect(typeof c.ARABIC_TEXT).toBe("string");
          expect(typeof c.AUDIO_URL).toBe("string");
          expect(c.AUDIO_URL.startsWith("http")).toBeTruthy();
        } catch (error) {
          console.log(
            `Failed at parent index ${fIndex}, child index ${cIndex}`
          );
          console.log("Parent:", f.TITLE);
          console.log("Child object:", JSON.stringify(c, null, 2));
          throw error;
        }
      });
    });
  });

  it("should children has the title & it match to the parent", () => {
    file.forEach((f) => {
      f.children.forEach((c) => {
        expect(c.ID).toBeDefined();
        expect(typeof c.TITLE).toBe("string");
        expect(c.TITLE).toEqual(f.TITLE);
      });
    });
  });
});
