# 🚀 Portfolio Setup Guide

## 📧 Contact Form & Email Setup

Your portfolio now has a fully functional contact form using **EmailJS**! Here's how to set it up:

### **Using EmailJS (Free & Easy)**

EmailJS allows you to send emails directly from the client-side without a backend server.

1. **Sign up for EmailJS**
   - Go to [emailjs.com](https://www.emailjs.com)
   - Create a free account (200 emails/month free)

2. **Set up Email Service**
   - Go to **Email Services** → **Add New Service**
   - Choose Gmail (or any email provider)
   - Connect your Gmail account
   - Copy the **Service ID**

3. **Create Email Template**
   - Go to **Email Templates** → **Create New Template**
   - Use this template:
   ```
   Subject: New Contact from {{from_name}}
   
   From: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```
   - Copy the **Template ID**

4. **Get your Public Key**
   - Go to **Account** → **General**
   - Copy your **Public Key**

5. **Add to your `.env.local`**
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

**That's it!** Your contact form will now send emails directly to `edehjohnpaul@gmail.com`.

---

## 📅 Calendly/Meeting Scheduler Setup

1. **Create a Calendly account**
   - Go to [calendly.com](https://calendly.com) or [cal.com](https://cal.com)
   - Set up your availability

2. **Get your booking link**
   - Copy your Calendly/Cal.com link
   - Example: `https://calendly.com/your-username`

3. **Update in your portfolio**
   Find and replace in `app/page.tsx`:
   ```typescript
   // Line 183 (Desktop header)
   href="https://calendly.com/your-username"
   
   // Line 207 (Mobile header)
   href="https://calendly.com/your-username"
   ```

---

## 🔗 Social Media Links

Update your social media links in `app/page.tsx`:

### **Desktop Header (around line 162-194)**
```typescript
// Twitter/X
href="https://twitter.com/your-username"

// LinkedIn
href="https://linkedin.com/in/your-username"

// GitHub
href="https://github.com/your-username"

// Email
href="mailto:your-email@example.com"
```

### **Footer (around line 708-735)**
Same pattern - update:
- Twitter
- LinkedIn  
- GitHub
- Dribbble (if you use it)

---

## 📝 Complete .env.local Setup

Create/update your `.env.local` file with all required variables:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key

# Admin User Configuration  
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourSecurePassword123

# EmailJS Configuration (Required for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🎯 Quick Start Checklist

- [ ] Install dependencies: `npm install`
- [ ] Set up `.env.local` with all variables
- [ ] Set up EmailJS account and get credentials
- [ ] Create admin user: `npm run create-admin`
- [ ] Update Calendly link in `app/page.tsx`
- [ ] Update social media links in `app/page.tsx` (Telegram, Facebook, etc.)
- [ ] Start dev server: `npm run dev`
- [ ] Test contact form at `http://localhost:3000/#contact`
- [ ] Test "Book a Call" button

---

## ✨ Features Implemented

### **1. Contact Form**
- ✅ Full state management
- ✅ Form validation
- ✅ Success/error messages
- ✅ Email sending via **EmailJS** (client-side, no backend needed!)
- ✅ Auto-reset after submission
- ✅ Sends directly to edehjohnpaul@gmail.com

### **2. Call to Actions**
- ✅ "Hire me!" button with smooth scroll to contact
- ✅ "Book a Call" button linking to Calendly
- ✅ Both desktop & mobile versions

### **3. Social Links**
- ✅ Header social icons (Twitter, **Telegram**, **Facebook**, GitHub, Email)
- ✅ Footer social links (Twitter, **Telegram**, **Facebook**, GitHub, Dribbble)
- ✅ Proper hover states & accessibility

---

## 🧪 Testing

### **Test Contact Form**
1. Fill out the form
2. Click "Send Message"
3. Check for success message
4. Verify email received in **edehjohnpaul@gmail.com** (if EmailJS is set up)

### **Test Smooth Scroll**
1. Click "Hire me!" button
2. Page should smoothly scroll to contact section

### **Test Call Booking**
1. Click "Book a Call"
2. Should open Calendly in new tab

---

## 🔧 Troubleshooting

### **Contact form not sending**
- Check if EmailJS credentials are set in `.env.local`:
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- Verify your EmailJS account is active
- Check browser console for errors
- Make sure template variables match: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`

### **Smooth scroll not working**
- Ensure contact section has `id="contact"`
- Check browser console for JavaScript errors

### **Social links not working**
- Verify you replaced `your-username` with actual usernames
- Update Telegram: `https://t.me/your-username`
- Update Facebook: `https://facebook.com/your-username`
- Test each link manually

---

## 📞 Support

Need help? Check:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Calendly Setup Guide](https://help.calendly.com)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Happy coding! 🎉**

