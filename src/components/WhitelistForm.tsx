
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import ChainSelector from "./ChainSelector";
import TwitterLoginButton from "./TwitterLoginButton";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  twitterId: z.string().optional(),
  twitterUsername: z.string().optional(),
  twitterName: z.string().optional(),
  chain: z.string({
    required_error: "Please select a blockchain",
  }),
  walletAddress: z.string().min(1, {
    message: "Please enter your wallet address",
  }),
  tweetLink: z
    .string()
    .min(1, {
      message: "Please paste the link to your tweet",
    })
    .regex(/^https?:\/\/(www\.)?twitter\.com|x\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+/, {
      message: "Please enter a valid Twitter/X post link",
    }),
  terminologyChoice: z.enum(["cross-chain", "cross chain", "crosschain"], {
    required_error: "Please select your preferred terminology",
  }),
});

type FormData = z.infer<typeof formSchema>;

const WhitelistForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chain: "",
      walletAddress: "",
      tweetLink: "",
      terminologyChoice: "cross-chain",
    },
  });

  const onSubmit = async (values: FormData) => {
    if (!isLoggedIn) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in with X (Twitter) first",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Form values:", values);

    // Simulate API call to backend
    try {
      // In a real app, this would be an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Submission successful!",
        description: "Your information has been recorded for the whitelist.",
      });
      
      // Optional: Reset the form after successful submission
      // form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your information. Please try again.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTwitterLoginSuccess = (userData: {
    id: string;
    name: string;
    username: string;
  }) => {
    form.setValue("twitterId", userData.id);
    form.setValue("twitterName", userData.name);
    form.setValue("twitterUsername", userData.username);
    setIsLoggedIn(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!isLoggedIn ? (
        <div className="mb-8 flex flex-col items-center space-y-4">
          <h2 className="text-xl font-medium mb-2">
            Sign in to join the Folks NFT whitelist
          </h2>
          <TwitterLoginButton onSuccess={handleTwitterLoginSuccess} />
        </div>
      ) : (
        <div className="mb-8 bg-secondary/50 p-4 rounded-lg">
          <p className="text-center text-sm">
            Signed in as @{form.getValues("twitterUsername")} ({form.getValues("twitterName")})
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="chain"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-xl font-medium">
                  What chain do you want to mint the Folks NFT on?
                </FormLabel>
                <FormControl>
                  <ChainSelector
                    onSelect={(chain) => field.onChange(chain)}
                    selectedChain={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Your Wallet Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Paste your wallet address here"
                    {...field}
                    className="bg-secondary/50 border-folks-purple/20 focus:border-folks-purple"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tweetLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Post about the Folks NFT on X to increase your chances!
                </FormLabel>
                <p className="text-sm text-muted-foreground mb-2">
                  Share your excitement about Folks NFT and paste the link to your post
                </p>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/username/status/123456789"
                    {...field}
                    className="bg-secondary/50 border-folks-purple/20 focus:border-folks-purple"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terminologyChoice"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-xl font-medium">
                  Which term do you prefer?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="cross-chain" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        cross-chain
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="cross chain" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        cross chain
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="crosschain" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        crosschain
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting || !isLoggedIn}
            className="w-full py-6 text-lg bg-folks-button hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Join Whitelist"
            )}
          </Button>

          {!isLoggedIn && (
            <p className="text-center text-amber-400 text-sm">
              Please sign in with X (Twitter) to submit
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default WhitelistForm;
