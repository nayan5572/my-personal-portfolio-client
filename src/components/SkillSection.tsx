"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript", level: 50 },
  { name: "TypeScript", level: 60 },
  { name: "React.js", level: 70 },
  { name: "Next.js", level: 80 },
  { name: "Node.js", level: 40 },
  { name: "Express.js", level: 60 },
  { name: "MongoDB", level: 50 },
  { name: "Tailwind CSS", level: 80 },
];

const SkillSection = () => {
  return (
    <div className="relative w-full bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className=" mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-extrabold text-gray-900 text-center"
        >
          My Skills
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 text-lg text-center mt-4"
        >
          A showcase of my expertise in web development technologies.
        </motion.p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {skill.name}
                </h3>
                <span className="text-gray-600 font-medium">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-2 rounded-full bg-[#78CC6D]"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillSection;
