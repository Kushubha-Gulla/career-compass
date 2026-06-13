import { useState } from "react";
import "./App.css";

const careers = {
  "Software Developer": {
    "HTML": "High",
    "CSS": "High",
    "JavaScript": "Very High",
    "React": "High",
    "Git": "Medium",
    "DSA": "Very High"
  },

  "Data Analyst": {
    "SQL": "Very High",
    "Python": "Very High",
    "Excel": "High",
    "Statistics": "High",
    "Power BI": "Medium"
  },

  "UI/UX Designer": {
    "Figma": "Very High",
    "Wireframing": "High",
    "Prototyping": "High",
    "Color Theory": "Medium",
    "User Research": "High"
  },

  "Cybersecurity Analyst": {
    "Networking": "Very High",
    "Linux": "High",
    "Cryptography": "Very High",
    "Security Tools": "High",
    "Ethical Hacking": "Very High"
  }
};

function App() {
  const [step, setStep] = useState(1);

  const [selectedCareer, setSelectedCareer] = useState("");

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
    setSelectedSkills([]);
    setStep(3);
  };

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((item) => item !== skill)
      );
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
    const requiredSkills = Object.keys(careers[selectedCareer] || {});
  const matchPercentage = Math.round(
    (selectedSkills.length / requiredSkills.length) * 100
  ) || 0;

  const strengths = selectedSkills.filter(skill =>
  requiredSkills.includes(skill)
);
  const missingSkills = requiredSkills.filter(
    (skill) => !selectedSkills.includes(skill)
  );

  const getFeedback = () => {
    if (matchPercentage <= 30) {
      return "You are at the beginning of your journey. Focus on building fundamental skills.";
    } else if (matchPercentage <= 70) {
      return "You have a good foundation. Improve your remaining skills to become more career-ready.";
    } else {
      return "Excellent progress! You are well prepared for this career. Continue practicing and improving your expertise.";
    }
  };
  const getCareerInsight = () => {
  if (!selectedCareer) return "";

  const skills = careers[selectedCareer] || {};
  const matched = selectedSkills.filter(skill => skills[skill]);

  const strengthCount = matched.length;

  if (strengthCount >= 4) {
    return `You are highly aligned with ${selectedCareer}. Your skill set matches industry requirements very well. You are ready for advanced projects and real-world applications.`;
  } 
  else if (strengthCount >= 2) {
    return `You are partially aligned with ${selectedCareer}. You already have a good foundation, but improving missing core skills will make you job-ready.`;
  }
  else {
    return `You are currently at the beginning stage for ${selectedCareer}. Focus on building strong foundational skills to enter this career path.`;
  }
};

  return (
    <div className="app">

      {/* Welcome Screen */}
      {step === 1 && (
        <div className="screen">
          <h1>Career Compass</h1>

          <h3>Career Guidance & Skill Analyzer</h3>

          <p>
            Analyze your skills and discover your ideal career pathway.
          </p>

          <button
            className="main-btn"
            onClick={() => setStep(2)}
          >
            Get Started
          </button>
        </div>
      )}
            {/* Career Selection Screen */}
      {step === 2 && (
  <div className="screen">

    <button
      className="back-btn"
      onClick={() => setStep(1)}
    >
      ←
    </button>
          <h1>Choose Your Career</h1>

          <p className="subtitle">
            Select a career path to start your assessment
          </p>

          <div className="career-container">
            {Object.keys(careers).map((career) => (
              <div
                key={career}
                className="career-card"
                onClick={() => handleCareerSelect(career)}
              >
                <h2>{career}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
            {/* Skill Assessment Screen */}
      {step === 3 && (
  <div className="screen">

    <button
      className="back-btn"
      onClick={() => setStep(2)}
    >
      ←
    </button>
          <h1>{selectedCareer} Assessment</h1>

          <p className="subtitle">
            Select the skills you already have
          </p>

          <div className="skills-container">
            {requiredSkills.map((skill) => (
              <label key={skill} className="skill-box">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />

                {skill}
              </label>
            ))}
          </div>

          <button
            className="main-btn"
            onClick={() => setStep(4)}
          >
            Analyze Skills
          </button>
        </div>
      )}
            {/* Analysis Report Screen */}
      {step === 4 && (
  <div className="screen">

    <button
      className="back-btn"
      onClick={() => setStep(3)}
    >
      ←
    </button>
          <h1>{selectedCareer} Report</h1>

          <h2 className="readiness-title">Career Readiness</h2>

<h1 className="readiness-score">
  {matchPercentage}%
</h1>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${matchPercentage}%` }}
            ></div>
          </div>

          <div className="report-container">

            <div className="report-box">
              <h3>Your Strengths</h3>

              {strengths.length > 0 ? (
                strengths.map((skill) => (
                  <p key={skill}> {skill}</p>
                ))
              ) : (
                <p>No skills selected</p>
              )}
            </div>


            <div className="report-box">
              <h3>Skills To Improve</h3>

              {missingSkills.map((skill) => (
                <p key={skill}> {skill}</p>
              ))}
            </div>

          </div>


          <p className="feedback">
            {getFeedback()}
          </p>
          <div className="insight-box">
  <h3>Why this career fits you</h3>
  <p>{getCareerInsight()}</p>
</div>
          <button
            className="main-btn"
            onClick={() => {
              setStep(2);
              setSelectedCareer("");
              setSelectedSkills([]);
            }}
          >
            Try Another Career
          </button>

        </div>
      )}
          </div>
  );
}

export default App;