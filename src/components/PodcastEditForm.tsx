import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  guests: z.string().optional(),
  duration: z.string().optional(),
});

interface PodcastEditFormProps {
  episode: {
    id: string;
    title: string;
    description?: string;
    guests?: string;
    duration?: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

const PodcastEditForm = ({ episode, onSuccess, onCancel }: PodcastEditFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: episode.title,
      description: episode.description || '',
      guests: episode.guests || '',
      duration: episode.duration || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('podcast_episodes')
        .update({
          title: values.title,
          description: values.description,
          guests: values.guests,
          duration: values.duration,
          updated_at: new Date().toISOString(),
        })
        .eq('id', episode.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Podcast episode updated successfully.",
      });

      onSuccess();
    } catch (error) {
      console.error('Error updating podcast episode:', error);
      toast({
        title: "Error",
        description: "Failed to update podcast episode. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Episode Title *</FormLabel>
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter episode description" 
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guests</FormLabel>
              <FormControl>
                <Input placeholder="Enter guest names (comma separated)" {...field} />
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
                <Input placeholder="e.g., 45 minutes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Episode'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PodcastEditForm;