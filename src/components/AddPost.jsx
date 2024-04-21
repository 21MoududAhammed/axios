import { useState } from "react";

export default function AddPost({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      body,
    };
    onAddPost(newPost);

    // reset form
    setTitle("");
    setBody("");
  };

  return (
    <div className="mt-5">
      <h2 className="text-2xl">Add new post</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <p>
          <input
            className="border rounded px-2"
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>

        <p>
          <input
            className="border rounded px-2"
            type="text"
            placeholder="Post body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </p>

        <div>
          <input
            className="border px-3 rounded bg-green-600 text-white font-semibold"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
