import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold text-destructive">404</CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">
            Oops! Page not found
          </p>
        </CardHeader>

        <Separator />

        <CardContent className="mt-5 flex flex-col gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            The page you are looking for doesn’t exist or has been moved.
          </p>

          <Link to="/" className="w-full">
            <Button className="w-full rounded-xl" size="lg">
              Go Back Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
