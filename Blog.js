//Blogging App with Firebase
import { useState, useRef, useEffect } from "react";
export default function Blog() {

    const [formData, setformData] = useState({ title: "", content: "" })
    const [blogs, setBlogs] = useState([]);

    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus()
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        titleRef.current.focus();

        setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);

        setformData({ title: "", content: "" });
    }

    async function removeBlog(i) {

        setBlogs(blogs.filter((blog, index) => index !== i));

    }

    return (
        <>
            <h1>Write a Blog!</h1>
            <div className="section">

                {/* Form for to write the blog */}
                <form onSubmit={handleSubmit}>
                    <Row label="Title">
                        <input className="input"
                            placeholder="Enter the Title of the Blog here.."
                            ref={titleRef}
                            value={formData.title}
                            onChange={(e) => setformData({ title: e.target.value, content: formData.content })}
                        />
                    </Row >

                    <Row label="Content">
                        <textarea className="input content"
                            placeholder="Content of the Blog goes here.."
                            required
                            value={formData.content}
                            onChange={(e) => setformData({ title: formData.title, content: e.target.value })}
                        />
                    </Row >

                    <button className="btn">ADD</button>
                </form>

            </div>

            <hr />

            {/* Section where submitted blogs will be displayed */}
            <h2> Blogs </h2>
            {blogs.map((blog, i) => (
                <div className="blog" key={i}>
                    <h3>{blog.title}</h3>
                    <hr />
                    <p>{blog.content}</p>

                    <div className="blog-btn">
                        <button onClick={() => {
                            removeBlog(i)
                        }}
                            className="btn remove">

                            Delete

                        </button>
                    </div>
                </div>
            ))}

        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    )
}
