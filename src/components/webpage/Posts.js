import { Links } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
export function Posts() {
  const { id } = useParams();
  const [posts, setPosts] = useState();
  const [singlepost, setSinglePost] = useState();
  let [currentPage, setCurrentPage] = useState(1);
  let [postImages, setPostImages] = useState([]);
  const postPerPage = 5;
  const photosMap = {};

  useEffect(() => {
    if (id) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts/" + id)
        .then((response) => {
          setSinglePost(response.data);
        })
        .catch(() => {});
    } else {
      Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/posts"),
        axios.get("https://jsonplaceholder.typicode.com/photos"),
      ])
        .then(([postResponse, photoResponse]) => {
          setPosts(postResponse.data);

          photoResponse.data.map((photo) => {
            photosMap[photo.id] = photo;
          });
          setPostImages(photosMap);
        })
        .catch((e) => {});
    }
  }, []);

  const changePage = (direction) => {
    let newPage = currentPage;

    if (direction === "next") {
      newPage = currentPage + 1;
    } else if (direction === "prev") {
      newPage = currentPage - 1;
    }

    // Set the new page number
    setCurrentPage(newPage);
  };
  const paginatedPosts =
    posts &&
    posts.slice((currentPage - 1) * postPerPage, currentPage * postPerPage);
  const isNextDisabled = posts && currentPage * postPerPage < posts.length; // Disable "Next" when there are no more posts to show
  const isPrevDisabled = posts && currentPage == 1;

  if (singlepost) {
    return (
      <>
        <section className="feature-section bg-light">
          <div className="container">
            <h1>{singlepost.title}</h1>
            <p>{singlepost.body}</p>
          </div>
        </section>
      </>
    );
  }
  if (Array.isArray(posts) && posts.length > 0) {
    return (
      <>
        <section className="feature-section bg-light posts">
          <div className="container">
            <h1>Posts</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {paginatedPosts.map((post, index) => {
                if (index < postPerPage) {
                  console.log(postImages);
                  return (
                    <Link to={`/posts/${post.id}`} key={post.id}>
                      <div className="col">
                        <div className="card feature-card">
                          {/* {postImages[post.id] && (
                            <img
                              src={postImages[post.id].url}
                              className="card-img-top"
                              alt="feature1"
                            />
                          )} */}
                          <img
                            src="https://www.w3schools.com/w3images/fjords.jpg"
                            className="card-img-top"
                            alt="feature1"
                          />

                          <div className="card-body feature-card-body">
                            <h4 className="card-title">{post.title}</h4>
                            <p className="card-text">{post.body}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
            <div className="pagination">
              {!isPrevDisabled && (
                <div className="arrow right" onClick={() => changePage("prev")}>
                  {" < "}
                  Prev
                </div>
              )}

              {isNextDisabled && (
                <div className="arrow left" onClick={() => changePage("next")}>
                  Next{" > "}
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="feature-section bg-light">
          <div className="container">
            <h1>Posts</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <p>Loading...</p>
            </div>
          </div>
        </section>
      </>
    );
  }
}
