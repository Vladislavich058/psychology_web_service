import { Button } from "@material-tailwind/react";
import React from "react";
import PillIcon from "images/pill.png"
import BrainsIcon from "images/brains.png"
import BriefCaseIcon from "images/briefcase.png"
import DiagnoseIcon from "images/diagnose.png"
import FamilyIcon from "images/family.png"
import GamepadIcon from "images/gamepad.png"
import GroupIcon from "images/group.png"
import StewardIcon from "images/employee.png"
import VideoIcon from "images/video.png"

const Home = () => {
  const serviceList = [
    {
      title: "Консультация психолога",
      description: "Индивидуальная консультация психолога в нашем центре.",
      icon: StewardIcon,
    },
    {
      title: "Онлайн консультации",
      description: "Индивидуальная консультация психолога по видеосвязи.",
      icon: VideoIcon,
    },
    {
      title: "Профориентация для взрослых",
      description:
        "Комплекс мероприятий помогающий определиться свои сильные стороны.",
      icon: BriefCaseIcon,
    },
    {
      title: "Работа с зависимостями",
      description:
        "Психологи центра помогут понять и победить Вашу зависимость.",
      icon: PillIcon,
    },
    {
      title: "Групповая терапия",
      description: "Новое поддерживающее окружение, познание себя и других.",
      icon: GroupIcon,
    },
    {
      title: "Психотерапия",
      description:
        "Психотерапия помогает стать более осознанной и целостной личностью.",
      icon: BrainsIcon,
    },
    {
      title: "Семейный психолог",
      description:
        "Консультация семейных пар. Помощь в преодолении кризисных ситуаций.",
      icon: FamilyIcon,
    },
    {
      title: "Профориентация для подростков",
      description: "Комплекс мероприятий помогающий определиться с профессией.",
      icon: GamepadIcon,
    },
    {
      title: "Психодиагностика",
      description:
        "Инструменты оценки и измерения индивидуально-психологических особенностей личности.",
      icon: DiagnoseIcon,
    },
  ];
  return (
    <div className="mt-40 px-32">
      <div className="text-2xl lg:text-4xl py-2 font-medium">
        Психология и психоанализ в Минске?
      </div>
      <div className="text-xl lg:text-2xl max-w-[600px] py-5 text-gray-800">
        Наша команда профессионалов поможет Вам обрести гармонию,
        психологическое здоровье и изобилие. Мы предлагаем большой выбор
        психологической помощи и поддержки в любых жизненных ситуациях.
      </div>
      <Button variant="outlined" className="rounded-none mt-5 text-black">
        Записаться на консультацию
      </Button>
      <hr className="my-14 border-t-gray-400" />
      <div>
        <div className="text-center text-2xl lg:text-4xl font-semibold">
          Наши услуги
        </div>
        <div className="mt-10 flex flex-wrap justify-center">
            {serviceList.map(({title, description, icon}) => (
                <div key={title} className="flex p-10 max-w-sm">
                    <img src={icon} className="block w-10 h-10 mr-5" alt="" />
                    <div>
                        <div className="text-2xl font-medium">{title}</div>
                        <div className="text-lg text-gray-800">{description}</div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
