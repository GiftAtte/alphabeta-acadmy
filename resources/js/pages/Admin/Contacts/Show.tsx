import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { ArrowLeft, Mail, Phone, Calendar, Clock, Send, User, MessageSquare } from 'lucide-react';
import AdminLayout from '@/layouts/admin-app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  admin_reply: string | null;
  replied_at: string | null;
  created_at: string;
  updated_at: string;
}

interface ContactShowProps {
  contact: Contact;
}

export default function ContactShow({ contact }: ContactShowProps) {
  const [reply, setReply] = useState(contact.admin_reply || '');
  const [submitting, setSubmitting] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Admin',
      href: '/admin/dashboard',
    },
    {
      title: 'Contacts',
      href: '/admin/contacts',
    },
    {
      title: 'View Message',
      href: `/admin/contacts/${contact.id}`,
    },
  ];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    router.post(route('admin.contacts.reply', contact.id), {
      reply: reply
    }, {
      onSuccess: () => {
        toast.success('Reply sent successfully!');
        setSubmitting(false);
      },
      onError: () => {
        toast.error('Failed to send reply. Please try again.');
        setSubmitting(false);
      }
    });
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title={`Message from ${contact.name}`} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.visit(route('admin.contacts.index'))}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contacts
            </Button>
          </div>
          <Badge className={contact.replied_at ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
            {contact.replied_at ? 'Replied' : 'Pending Reply'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm text-muted-foreground mb-1">Name</h3>
                <p className="font-medium">{contact.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-muted-foreground mb-1">Email</h3>
                <p className="font-medium">
                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                    {contact.email}
                  </a>
                </p>
              </div>
              
              {contact.phone && (
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Phone</h3>
                  <p className="font-medium">
                    <a href={`tel:${contact.phone}`} className="hover:underline">
                      {contact.phone}
                    </a>
                  </p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm text-muted-foreground mb-1">Submitted On</h3>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {formatDate(contact.created_at)}
                </p>
              </div>
              
              {contact.replied_at && (
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Replied On</h3>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(contact.replied_at)}
                  </p>
                </div>
              )}
              
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  asChild
                >
                  <a href={`https://wa.me/${contact.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Message Content & Reply */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Message
                </CardTitle>
                <CardDescription>
                  Subject: <span className="font-medium">{contact.subject}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 whitespace-pre-wrap">
                  {contact.message}
                </div>
              </CardContent>
            </Card>

            {contact.admin_reply && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Your Reply
                  </CardTitle>
                  <CardDescription>
                    Sent on {formatDate(contact.replied_at || '')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/5 rounded-lg p-4 whitespace-pre-wrap">
                    {contact.admin_reply}
                  </div>
                </CardContent>
              </Card>
            )}

            {!contact.replied_at && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-primary" />
                    Reply to this message
                  </CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <Textarea
                      placeholder="Type your reply here..."
                      className="min-h-[200px]"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      required
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between border-t px-6 py-4">
                    <p className="text-sm text-muted-foreground">
                      The reply will be sent to {contact.email}
                    </p>
                    <Button 
                      type="submit" 
                      className="flex items-center gap-2" 
                      disabled={submitting || !reply.trim()}
                    >
                      {submitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Reply
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 