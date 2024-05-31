import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import dortheImage from "../assets/dorthe.jpeg";
import jeannetteImage from "../assets/jeannette.jpeg";

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center gap-12 px-4 py-8 md:px-32">
      <h1 className="text-3xl font-bold text-center text-yellow-600">
        Sådan kommer du i kontakt med os
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Dorthe Bernhardt</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <img
              src={dortheImage}
              alt="Dorthe"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <CardDescription className="text-center">
              <p>tlf.nr.: 93601900</p>
              <p>email: dorthe@test.com</p>
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Jeannette Grøn</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <img
              src={jeannetteImage}
              alt="Jeannette"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <CardDescription className="text-center">
              <p>tlf.nr.: 93601901</p>
              <p>email: jeagron@gmail.com</p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
