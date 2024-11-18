import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dukewoyh4",
  api_key: "696446912682682",
  api_secret: "SK_NbG0-1lNYACUg0-Z8bm3nE1g",
  secure: true,
});

describe("fileUpload", () => {
  it("should upload files to cloudinary", async () => {
    const imageUrl =
      "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/1-beautiful-and-sexy-blonde-girl-with-big-boobs-mihai-b.jpg";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    //const file = new File([blob], "babe.jpg");
    /* console.log(blob);

    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    // delete img from cloudinary
    const segments = url.split("/");
    // get the last segment where img id is
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    await cloudinary.api.delete_resources([imageId]); */
  });

  /* it("should return null", () => {
    const file = new File([], "babe.jpg");
    expect(async () => {
      await fileUpload(file);
    }).rejects.toThrow();
  }); */
});
