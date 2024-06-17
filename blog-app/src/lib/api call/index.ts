export const addPost = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  try {
    const res = await fetch("http://localhost:3000/api/add-post", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      cache: "no-cache",
    });
    const convert = await res.json();
    return convert;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogs = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/read-posts", {
      method: "GET",
      cache: "no-cache",
    });

    const convert = await res.json();
    return convert?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id: String) => {
  try {
    const res = await fetch("http://localhost:3000/api/delete-post", {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
    });
    const convert = await res.json();
    return convert?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (id: String, data:object) => {
  try {
    const res = await fetch("http://localhost:3000/api/update-post", {
      method: "PUT",
      body: JSON.stringify({
        id,
        data
      }),
    });
    const convert = await res.json();
    return convert.data;
  } catch (error) {
    console.log(error);
  }
};
