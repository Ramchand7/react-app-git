export function Header(Props){
    return (
      <>
        <section class="hero-section">
          <div class="container">
            <h1 class="display-3">{Props.title} to the Future of Web Design</h1>
            <p class="lead">
              Innovative, beautiful, and responsive designs that stand out.
            </p>
            <a href="#" class="btn btn-light btn-lg mt-3">
              Explore Now
            </a>
          </div>
        </section>
      </>
    );
}