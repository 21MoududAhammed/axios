import { useState } from "react";

export default function EditPost({ post, onEditPost }) {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPost = {
            id: post.id,
            title,
            body,
        };
        onEditPost(updatedPost);

        // reset form
        setTitle("");
        setBody("");
    };

    return (
        <div>
            <h2 className='text-2xl'>Edit post</h2>

            <form onSubmit={handleSubmit} className="space-y-2">
                <p>
                    <input  className="border rounded px-2"
                        type="text"
                        placeholder="Post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </p>

                <p>
                    <input  className="border rounded px-2"
                        type="text"
                        placeholder="Post body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </p>

                <div>
                    <input className="border px-3 rounded bg-green-600 text-white font-semibold" type="submit" />
                </div>
            </form>
        </div>
    );
}
