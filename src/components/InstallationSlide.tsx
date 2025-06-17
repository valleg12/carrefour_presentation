import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

interface InstallationSlideProps {
  steps: {
    step: string;
    description: string;
    screenshots: {
      image: string;
      caption: string;
    }[];
  }[];
}

export default function InstallationSlide({ steps }: InstallationSlideProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground">
      <h2 className="text-4xl font-bold mb-8">Guide d'Installation</h2>
      <div className="w-full max-w-6xl grid gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="w-full">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Étape {index + 1}: {step.step}</h3>
                  <p className="text-lg">{step.description}</p>
                </div>
                {step.screenshots.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {step.screenshots.map((screenshot, screenshotIndex) => (
                      <div key={screenshotIndex} className="space-y-2">
                        <img
                          src={import.meta.env.BASE_URL + screenshot.image}
                          alt={`${step.step} - Capture ${screenshotIndex + 1}`}
                          className="rounded-lg shadow-lg w-full h-auto"
                        />
                        <p className="text-sm text-gray-600 text-center">{screenshot.caption}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 