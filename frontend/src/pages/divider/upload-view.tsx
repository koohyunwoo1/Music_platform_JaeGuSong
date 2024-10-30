import { Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

export default function DividerUploadView() {
  return (
    <div>
      upload-view
      <Button>Click me</Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toaster.success({
            title: "Update successful",
            description: "File saved successfully to the server",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Click me
      </Button>
    </div>
  );
}
