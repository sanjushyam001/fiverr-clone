import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "o95nvdra");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/sanjushyam001/image/upload",
      data
    );

    const { url } = response.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};
export default upload;
