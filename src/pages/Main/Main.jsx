import React from "react";
import classes from "./Main.module.css";

const Main = () => {
  return (
      <section className={classes.main}>
        <video className={classes.video} autoPlay loop muted playsInline>
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className={classes.overlay}>
          <div className={classes.textBox}>
            <h1 className={classes.title}>
              Восстанови связь
              <br />
              <span>с природой</span>
            </h1>
          </div>
        </div>
      </section>
  );
};

export default Main;
