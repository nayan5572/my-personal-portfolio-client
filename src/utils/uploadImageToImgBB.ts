export const uploadImageToImgBB = async (file: File) => {
    const IMG_BB_API_KEY = "5eece81bae3064a984a2456e43f75675";
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Error uploading image: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data.url;
    } catch (error) {
        console.error("Error uploading image to ImgBB:", error);
        throw error;
    }
};
