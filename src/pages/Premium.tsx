import Header from "../components/Header";
import Textfield from "../components/TextField";

function Premium() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center px-44 pt-16">
        <h1 className="font-extrabold text-5xl text-primary">Set Your Plan</h1>
        <div className="w-full pt-12">
          <Textfield label="Nama Penerima" />
          <Textfield label="Alamat Pengantaran" />
          <Textfield label="Pengantaran tiap ping pirang dino po pie? radong tulung sing duwe ide" />
          <Textfield label="Nomor Handphone" />
          <Textfield label="Produk" />
          BUTTON
        </div>
      </div>
    </>
  );
}

export default Premium;
