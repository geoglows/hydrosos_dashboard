const BASE_URL =
  "http://geoglows-v2.s3-us-west-2.amazonaws.com/hydrosos/cogs";

export async function findLatestTif() {
  const today = new Date();

  for (let i = 0; i < 6; i++) {
    const testDate = new Date(today);
    testDate.setMonth(today.getMonth() - i);

    const year = testDate.getFullYear();
    const month = String(testDate.getMonth() + 1).padStart(2, "0");

    const url = `${BASE_URL}/${year}-${month}.tif`;

    try {
      const response = await fetch(url, { method: "HEAD" });

      if (response.ok) {
        console.log("Found TIFF:", url);
        return url;
      }
    } catch (error) {
      console.warn("Failed to check:", url);
    }
  }

  throw new Error("Could not find a recent TIFF.");
}

