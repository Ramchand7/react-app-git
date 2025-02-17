export function Homepage(props) {
  return (
    <>
    

      <section class="feature-section bg-light">
        <div class="container">
          <h2 class="text-center mb-5">Our Key Features</h2>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
              <div class="card feature-card">
                <img
                  src="https://www.w3schools.com/w3images/fjords.jpg"
                  class="card-img-top"
                  alt="feature1"
                />
                <div class="card-body feature-card-body">
                  <h5 class="card-title">Stunning Visuals</h5>
                  <p class="card-text">
                    Create beautiful and responsive designs that engage your
                    audience with stunning visuals.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card feature-card">
                <img
                  src="https://www.w3schools.com/w3images/lights.jpg"
                  class="card-img-top"
                  alt="feature2"
                />
                <div class="card-body feature-card-body">
                  <h5 class="card-title">User-Friendly</h5>
                  <p class="card-text">
                    Our designs are not only stunning but also intuitive and
                    easy to use for a seamless experience.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card feature-card">
                <img
                  src="https://www.w3schools.com/w3images/mountains.jpg"
                  class="card-img-top"
                  alt="feature3"
                />
                <div class="card-body feature-card-body">
                  <h5 class="card-title">Responsive Design</h5>
                  <p class="card-text">
                    Our designs adapt perfectly to all screen sizes, ensuring a
                    smooth experience on any device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
