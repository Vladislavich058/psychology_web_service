import {
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import {
  Alert,
  Button,
  IconButton,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import ClientService from "API/ClientService";
import CallForm from "components/CallForm";
import OfficeList from "components/OfficeList";
import PsychologistList from "components/PsychologistList";
import RecordForm from "components/RecordForm";
import { useFetching } from "hooks/useFetching";
import BrainsIcon from "images/brains.png";
import BriefCaseIcon from "images/briefcase.png";
import DiagnoseIcon from "images/diagnose.png";
import StewardIcon from "images/employee.png";
import FamilyIcon from "images/family.png";
import GamepadIcon from "images/gamepad.png";
import GroupIcon from "images/group.png";
import PillIcon from "images/pill.png";
import VideoIcon from "images/video.png";
import React, { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

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
  const [psychologists, setPsychologists] = useState([]);
  const [offices, setOffices] = useState([]);
  const [openChat, setOpenChat] = useState(false);

  const handleOpenChat = () => setOpenChat(!openChat);

  const [openRecordForm, setOpenRecordForm] = useState(false);

  const handleOpenRecordForm = () => setOpenRecordForm(!openRecordForm);

  const {
    fetching: fetchPsycho,
    isLoading: isPsychoLoading,
    error: psychoError,
    errorOpen: open,
  } = useFetching(async () => {
    const response = await ClientService.getPsychologists();
    setPsychologists(response.data);
  });

  const {
    fetching: fetchOffices,
    isLoading: isOfficesLoading,
    error: officesError,
    errorOpen: officesOpen,
  } = useFetching(async () => {
    const response = await ClientService.getOffices();
    setOffices(response.data);
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(!openDialog);

  useEffect(() => {
    fetchPsycho();
    fetchOffices();
  }, []);

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
      <AnchorLink href="#psychologists">
        <Button variant="outlined" className="rounded-none mt-5 text-black">
          Записаться на консультацию
        </Button>
      </AnchorLink>
      <hr className="my-14 border-t-gray-400" />
      <section id="services">
        <div className="text-center text-2xl lg:text-4xl font-semibold mb-10 ">
          Наши услуги
        </div>
        <div className="flex flex-wrap justify-center">
          {serviceList.map(({ title, description, icon }) => (
            <div key={title} className="flex p-10 max-w-sm">
              <img src={icon} className="block w-10 h-10 mr-5" alt="" />
              <div>
                <div className="text-2xl font-medium">{title}</div>
                <div className="text-lg text-gray-800">{description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className="my-14 border-t-gray-400" />
      <section id="psychologists">
        <div className="text-center text-2xl lg:text-4xl font-semibold mb-10">
          Наши специалисты
        </div>
        <Alert
          className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
          open={open}
        >
          {psychoError}
        </Alert>
        {isPsychoLoading ? (
          <div className="flex justify-center mt-12">
            <Spinner />
          </div>
        ) : (
          <PsychologistList psychologists={psychologists} />
        )}
      </section>
      <hr className="my-14 border-t-gray-400" />
      <section id="offices">
        <div className="text-center text-2xl lg:text-4xl font-semibold mb-10">
          Наши офисы
        </div>
        <Alert
          className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
          open={officesOpen}
        >
          {officesError}
        </Alert>
        {isOfficesLoading ? (
          <div className="flex justify-center mt-12">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="flex justify-center">
              <Button
                variant="outlined"
                className="rounded-none mt-5 text-black text-sm py-2"
                onClick={() => {
                  setOpenRecordForm(true);
                }}
              >
                Записаться
              </Button>
            </div>
            <OfficeList offices={offices} />
          </div>
        )}
      </section>
      <hr className="my-14 border-t-gray-400" />
      <section id="offices">
        <div className="text-center text-2xl lg:text-4xl font-semibold mb-10">
          Где нас найти
        </div>
        <div className="flex justify-center">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A4ffa229018d6adacbc8f7305122552f5678c47842e581eefa09bcabdc018f35f&amp;source=constructor"
            width="835"
            height="460"
          ></iframe>
        </div>
      </section>
      <div className="sticky right-0 bottom-0">
        <div className={`justify-end ${openChat ? "flex" : "hidden"}`}>
          <div className="border-gray-500 rounded-xl bg-gray-200 w-[300px] h-[400px] relative">
            <div className="text-center p-5">Чат</div>
            <div className="absolute -bottom-1 left-1 right-1">
              <div className="relative">
                <div className="absolute right-0 z-30">
                  <IconButton variant="text">
                    <PaperAirplaneIcon strokeWidth={2} className="h-5 w-5" />
                  </IconButton>
                </div>
                <Textarea label="Ваше сообщение" />
              </div>
            </div>
          </div>
        </div>
        <div className="gap-3 flex justify-end py-10">
          <Button
            variant="filled"
            className="rounded-none text-sm py-2"
            onClick={() => setOpenDialog(true)}
          >
            Заказать обратный звонок
          </Button>
          <IconButton variant="text" onClick={() => handleOpenChat()}>
            <ChatBubbleOvalLeftIcon strokeWidth={2} className="h-10 w-10" />
          </IconButton>
        </div>
      </div>
      <CallForm
        openDialog={openDialog}
        handleOpenDialog={handleOpenDialog}
        setOpenDialog={setOpenDialog}
      />
      <RecordForm
        openDialog={openRecordForm}
        handleOpenDialog={handleOpenRecordForm}
        type="office"
      />
    </div>
  );
};

export default Home;
