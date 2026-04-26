import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// One-time seed endpoint — only available in development
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production.' }, { status: 403 });
  }

  await prisma.announcement.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.tourismSpot.deleteMany();
  await prisma.transparencyDocument.deleteMany();
  await prisma.serviceForm.deleteMany();
  await prisma.official.deleteMany();

  await prisma.announcement.createMany({
    data: [
      { text: 'Welcome to the official website of the Municipality of Conner, Apayao', order: 0 },
      { text: 'Home of the Isnag people · Cordillera Administrative Region', order: 1 },
      { text: 'Downloadable government forms now available online', order: 2 },
      { text: 'For inquiries contact the Municipal Hall · Caglayan, Conner, Apayao', order: 3 },
    ],
  });

  await prisma.newsArticle.createMany({
    data: [
      {
        title: 'Municipal Budget Transparency Report Now Available for Public Review',
        excerpt: 'The municipality of Conner is pleased to announce that the full budget transparency report for fiscal year 2025 is now available for public viewing.',
        content: 'The municipality of Conner is pleased to announce that the full budget transparency report for fiscal year 2025 is now available for public viewing. Citizens may access the document through the Transparency Portal or visit the Municipal Hall during office hours.',
        tag: 'Announcement',
        icon: '📊',
        isFeatured: true,
        publishedAt: new Date('2026-03-15'),
      },
      {
        title: 'Conner Joins Apayao Biosphere Reserve Initiative',
        excerpt: 'The municipality formally joins the Apayao Biosphere Reserve initiative, reinforcing its commitment to environmental conservation.',
        content: 'The municipality formally joins the Apayao Biosphere Reserve initiative, reinforcing its commitment to environmental conservation and sustainable tourism development.',
        tag: 'Tourism',
        icon: '🌿',
        isFeatured: false,
        publishedAt: new Date('2026-03-10'),
      },
      {
        title: 'New Business Permit Forms Now Available Online',
        excerpt: 'Citizens can now download and submit business permit application forms through the municipal website.',
        content: 'Citizens can now download and submit business permit application forms through the municipal website. The new online system reduces processing time and allows applicants to track their application status.',
        tag: 'Services',
        icon: '📋',
        isFeatured: false,
        publishedAt: new Date('2026-03-05'),
      },
      {
        title: 'SB Enacts Ordinance No. 2026-003 on Waste Management',
        excerpt: 'The Sangguniang Bayan has enacted a new ordinance on solid waste management for all barangays.',
        content: 'The Sangguniang Bayan has enacted Ordinance No. 2026-003, establishing comprehensive waste management policies for all 21 barangays in the municipality.',
        tag: 'Ordinance',
        icon: '⚖️',
        isFeatured: false,
        publishedAt: new Date('2026-02-28'),
      },
      {
        title: 'Apayao General Hospital Renamed and Expanded',
        excerpt: 'The Apayao General Hospital has been officially renamed and will undergo major expansion to serve more residents.',
        content: 'The Apayao General Hospital has been officially renamed and will undergo major expansion to better serve the growing population of Apayao province, including Conner residents.',
        tag: 'News',
        icon: '🏥',
        isFeatured: false,
        publishedAt: new Date('2026-02-20'),
      },
    ],
  });

  await prisma.tourismSpot.createMany({
    data: [
      { name: 'Apayao-Abulug River', description: 'A majestic river flowing through Conner, part of the UNESCO-listed Apayao Biosphere Reserve.', icon: '🏔️', order: 0 },
      { name: 'Natural Springs', description: 'Cool, clear springs nestled in the mountains of Conner, accessible via scenic forest trails.', icon: '💧', order: 1 },
      { name: 'Dipterocarp Forest', description: 'Home to lawaan trees, Rafflesia flowers, and critically endangered wildlife of the Cordillera.', icon: '🌳', order: 2 },
    ],
  });

  await prisma.transparencyDocument.createMany({
    data: [
      { name: 'Annual Budget 2026', description: 'Approved Municipal Budget · FY 2026', icon: '📊', year: '2026' },
      { name: 'Annual Budget 2025', description: 'Approved Municipal Budget · FY 2025', icon: '📊', year: '2025' },
      { name: 'Statement of Receipts & Expenditures', description: 'Financial performance for FY 2025', icon: '💰', year: '2025' },
      { name: 'COA Annual Audit Report', description: 'Commission on Audit findings · 2024', icon: '📋', year: '2024' },
      { name: 'Ordinance No. 2026-003 — Waste Management', description: 'Enacted February 28, 2026', icon: '⚖️', year: '2026' },
      { name: 'Ordinance No. 2025-001 — Revenue Code Amendment', description: 'Enacted January 10, 2025', icon: '⚖️', year: '2025' },
      { name: 'FOI Manual — Freedom of Information Policy', description: 'EO 2 s.2016 Compliance Document', icon: '📌', year: '2023' },
    ],
  });

  await prisma.serviceForm.createMany({
    data: [
      { name: 'Business Permit Application', office: "Mayor's Office", order: 0 },
      { name: 'Barangay Clearance Request', office: 'Barangay Affairs', order: 1 },
      { name: 'Indigency Certificate', office: 'Social Welfare Office', order: 2 },
      { name: 'Building Permit Application', office: 'Municipal Engineer', order: 3 },
      { name: 'Local Employment Form', office: 'PESO Office', order: 4 },
      { name: 'FOI Request Form', office: "Mayor's Office", order: 5 },
    ],
  });

  await prisma.official.createMany({
    data: [
      { name: 'Hon. [Mayor Name]', position: 'Municipal Mayor', badge: 'Mayor', order: 0 },
      { name: 'Hon. [Vice Mayor]', position: 'Vice Mayor', order: 1 },
      { name: 'Hon. [Councilor 1]', position: 'SB Member', order: 2 },
      { name: 'Hon. [Councilor 2]', position: 'SB Member', order: 3 },
      { name: 'Hon. [Councilor 3]', position: 'SB Member', order: 4 },
      { name: 'Hon. [Councilor 4]', position: 'SB Member', order: 5 },
    ],
  });

  return NextResponse.json({ success: true, message: 'Database seeded successfully.' });
}
