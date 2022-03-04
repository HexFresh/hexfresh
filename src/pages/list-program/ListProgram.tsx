import React, { useEffect, useState } from 'react';
import './list-program.css';

interface Program {
  id: string;
  name: string;
}

export default function ListProgram() {
  const [program, setProgram] = useState<Program[] | []>([]);

  console.log(program);

  useEffect(() => {
    const data = [
      {
        id: '1',
        name: 'Program 1',
      },
      {
        id: '2',
        name: 'Program 2',
      },
      {
        id: '3',
        name: 'Program 3',
      },
    ];
    setProgram(data);
  }, []);

  return (
    <div className="list-program">
      <div className="container">
        <div className="left">
          <div className="top">
            <div className="coverphoto">
              <img
                src="https://i.pinimg.com/originals/62/2a/f1/622af1ce20783731327ba9365ae66ab8.jpg"
                alt="cover"
              />
            </div>
            <div className="logo">
              <img
                src="https://top10vietnam.top/wp-content/uploads/2021/10/Tong-hop-10-cong-ty-thiet-ke-logo-dep-uy-tin-chat-luong-tai-Ha-Noi-7.png"
                alt="logo"
              />
            </div>
            <p className="title">For Mentor</p>
          </div>
          <div className="bottom">
            <div className="list-program">
              {program.map((program) => (
                <div className="program">
                  <div className="program__name">{program.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
