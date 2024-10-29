export const fileUpload = async (file) => {
  if (!file) throw new Error("There is no file to upload");

  const cloudUrl = "https://api.cloudinary.com/v1_1/dukewoyh4/image/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    console.log(resp);
    if (!resp.ok)
      throw new Error("There is an issue uploading files try again");
    const cloudResp = await resp.json();
    console.log(cloudResp);
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
