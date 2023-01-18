const ConsultorBio = ({ consultor }) => (
  <div className="w-[50%]">
    <div className="flex">
      <h2 className="text-lg font-bold my-auto mr-5">Biografía</h2>
    </div>

    <div className="leading-7 text-justify italic text-[12px]">
      {consultor?.biography}
    </div>
  </div>
);

export default ConsultorBio;
