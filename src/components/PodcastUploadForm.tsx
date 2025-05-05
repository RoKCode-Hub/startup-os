
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mic } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  guests: z.string().min(3, { message: "Please provide guest names" }),
  duration: z.string().min(2, { message: "Please provide episode duration (e.g. 45:30)" }),
  audioFile: z.any().refine((file) => file instanceof File, { message: "Please upload an audio file" }),
});

const PodcastUploadForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      guests: "",
      duration: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUploading(true);
    
    try {
      // In a real application, this would upload to a server
      // For this demo, we'll simulate a successful upload
      console.log("Podcast episode data:", values);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success("Podcast episode uploaded successfully!", {
        description: `"${values.title}" has been published.`,
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast.error("Upload failed", {
        description: "There was an error uploading your podcast episode. Please try again.",
      });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("audioFile", file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Mic className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-bold">Upload New Podcast Episode</h3>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Episode Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter episode title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Episode Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter episode description" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guests</FormLabel>
                  <FormControl>
                    <Input placeholder="Guest names (comma separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 45:30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormItem>
            <FormLabel>Audio File</FormLabel>
            <Input 
              type="file" 
              accept="audio/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <FormMessage>{form.formState.errors.audioFile?.message as string}</FormMessage>
          </FormItem>
          
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Episode"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PodcastUploadForm;
