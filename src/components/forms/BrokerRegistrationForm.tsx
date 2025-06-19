import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const schema = z.object({
  fullName: z.string().min(1, 'Required'),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  platform: z.enum(['MT4', 'MT5']),
  accountType: z.enum(['Standard', 'Pro']),
  deposit: z.preprocess(v => Number(v), z.number().min(0).optional()),
});

type FormValues = z.infer<typeof schema> & { kyc?: FileList };

const BrokerRegistrationForm: React.FC = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user.id ?? null;
      let kycUrl: string | null = null;
      if (values.kyc && values.kyc.length > 0) {
        const file = values.kyc[0];
        const filePath = `${userId ?? 'anon'}/${Date.now()}_${file.name}`;
        const { error } = await supabase.storage.from('broker-docs').upload(filePath, file);
        if (!error) {
          const { data } = supabase.storage.from('broker-docs').getPublicUrl(filePath);
          kycUrl = data.publicUrl;
        }
      }
      await supabase.from('broker_registrations').insert({
        user_id: userId,
        full_name: values.fullName,
        email: values.email,
        phone: values.phone ?? null,
        country: values.country ?? null,
        platform: values.platform,
        account_type: values.accountType,
        deposit: values.deposit ?? null,
        kyc_url: kycUrl,
      });
      toast({ title: 'Registration submitted', description: 'Our team will review your details shortly.' });
      reset();
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Submission failed', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 bg-[#1A1A1A] rounded-xl border border-gray-600">
      <div>
        <label className="block mb-1 text-sm font-medium">Full Name</label>
        <Input {...register('fullName')} disabled={submitting} />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Email</label>
        <Input type="email" {...register('email')} disabled={submitting} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Phone</label>
        <Input {...register('phone')} disabled={submitting} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Country</label>
        <Input {...register('country')} disabled={submitting} />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium">Platform</label>
          <select {...register('platform')} className="w-full bg-[#131313] border border-gray-600 rounded-md p-2" disabled={submitting}>
            <option value="MT4">MT4</option>
            <option value="MT5">MT5</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium">Account Type</label>
          <select {...register('accountType')} className="w-full bg-[#131313] border border-gray-600 rounded-md p-2" disabled={submitting}>
            <option value="Standard">Standard</option>
            <option value="Pro">Pro</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Deposit (USD)</label>
        <Input type="number" step="0.01" {...register('deposit')} disabled={submitting} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">KYC Document (optional)</label>
        <Input type="file" {...register('kyc')} disabled={submitting} />
        <p className="text-xs text-gray-400 mt-1">Uploading helps verify your account faster.</p>
      </div>
      <Button type="submit" disabled={submitting} className="w-full bg-gray-800 border border-gray-600 text-white hover:bg-gray-700">
        {submitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default BrokerRegistrationForm;
