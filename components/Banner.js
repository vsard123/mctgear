import React from "react";

import LevelOne from "./MegaMenu.js/LevelOne";

const Banner = ({ categories }) => {
  return (
    <section className="section-content py-5">
      <div className="row">
        <aside className="col-lg-3	d-none d-sm-block">
          <nav className="sidebar card box-shadow">
            <LevelOne categories={categories} />
          </nav>
        </aside>
        <main className="col-lg-9">
          <img style={{ maxWidth: "100%" }} src="./images/banner/banner.jpg" />
        </main>
      </div>
    </section>
  );
};

export default Banner;
