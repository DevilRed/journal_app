import { fileUpload } from "../../src/helpers/fileUpload";

describe("fileUpload", () => {
  it("should upload files to cloudinary", async () => {
    const imageUrl =
      "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/1-beautiful-and-sexy-blonde-girl-with-big-boobs-mihai-b.jpg";
    const resp = await fetch(imageUrl);
    // console.log(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "babe.jpg");

    const url = await fileUpload(file);
    expect(typeof url).toBe("string");
  });
});
