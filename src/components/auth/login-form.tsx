import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, GanttChartSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from './auth-provider';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Enter your login.' }),
  password: z.string().min(1, { message: 'Enter your password.' }),
});

export function LoginForm() {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await signIn(values.username, values.password);
      toast({
        title: 'Logged in successfully',
        description: 'Welcome back!',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-start justify-center overflow-x-hidden px-4 py-8 lg:items-center">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="console-panel relative grid w-full max-w-5xl overflow-hidden rounded-2xl border border-cyan-400/25 bg-slate-950/75 backdrop-blur-xl md:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden flex-col justify-between border-r border-cyan-400/15 p-10 md:flex">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-teal-300">Bay command</p>
            <h1 className="mt-4 font-mono text-4xl font-semibold leading-tight tracking-tight">
              Ctrl + Alt
              <span className="block text-teal-300">+ Garage</span>
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Dispatch, inventory, and the week’s door jobs on one board. Built as a show floor for the shop.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <div className="rounded-lg border border-cyan-400/15 p-3">
              <dt>Techs</dt>
              <dd className="mt-1 text-lg text-foreground">08</dd>
            </div>
            <div className="rounded-lg border border-cyan-400/15 p-3">
              <dt>Jobs</dt>
              <dd className="mt-1 text-lg text-foreground">16</dd>
            </div>
            <div className="rounded-lg border border-cyan-400/15 p-3">
              <dt>Parts</dt>
              <dd className="mt-1 text-lg text-foreground">22</dd>
            </div>
          </dl>
        </div>
        <div className="p-6 sm:p-10">
        <div className="mb-8 flex items-center gap-3 md:hidden">
          <GanttChartSquare className="h-8 w-8 text-teal-400" />
          <p className="font-mono text-xl font-semibold">Ctrl + Alt + Garage</p>
        </div>
        <p className="mb-6 hidden font-mono text-xs uppercase tracking-[0.22em] text-teal-300 md:block">Operator sign-in</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" autoComplete="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? 'Hide password' : 'Show password'}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button
                  type="submit"
                  className="h-11 w-full bg-teal-400 font-semibold text-slate-950 hover:bg-teal-300"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
            </form>
          </Form>

        </div>
      </div>
    </div>
  );
}