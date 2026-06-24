import "./About.css";
import avatar from "../../assets/avatar.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <img src={avatar} alt="Author Avatar" className="about__avatar" />
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__paragraph">
            Hello! My name is Zach Marks and I'm a full stack software developer
            with a passion for creating dynamic and user-friendly web
            applications. With the help of the TripleTen bootcamp program, I now
            specialize in both front-end and back-end development.
          </p>
          <p className="about__paragraph">
            Through the TripleTen program, I have studied the MERN stack,
            gaining proficiency in MongoDB, Express.js, React, and Node.js. I
            have also developed skills in HTML, CSS, JavaScript, and various
            libraries to build fully functional full-stack web apps. I look
            forward to bringing my expertise to any potential clients in need of
            a proficient software engineer.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
