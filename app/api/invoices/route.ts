import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const invoice = await prisma.invoice.create({
      data: {
        userId: user.id,
        invoiceNo: data.invoiceNo,
        invoiceDate: data.invoiceDate ? new Date(data.invoiceDate) : null,
        paymentTerms: data.paymentTerms,
        shipperName: data.shipperName,
        shipperAddress: data.shipperAddress,
        shipperContact: data.shipperContact,
        consigneeName: data.consigneeName,
        consigneeAddress: data.consigneeAddress,
        consigneeContact: data.consigneeContact,
        buyerName: data.buyerName,
        buyerAddress: data.buyerAddress,
        buyerContact: data.buyerContact,
        portOfLoading: data.portOfLoading,
        finalDestination: data.finalDestination,
        vesselFlight: data.vesselFlight,
        sailingDate: data.sailingDate ? new Date(data.sailingDate) : null,
        marksAndNumbers: data.marksAndNumbers,
        bankName: data.bankName,
        bankAddress: data.bankAddress,
        swiftNo: data.swiftNo,
        accountNo: data.accountNo,
        accountName: data.accountName,
        currency: data.currency,
        logoUrl: data.logoUrl,
        remarks: data.remarks,
        items: {
          create: data.items.map((item: any) => ({
            no: item.no,
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            unitPriceCurrency: item.unitPriceCurrency,
            amount: item.amount,
            amountCurrency: item.amountCurrency,
            note: item.note
          }))
        }
      },
      include: {
        items: true
      }
    })

    return NextResponse.json(invoice)
  } catch (error) {
    console.error('Error creating invoice:', error)
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const invoices = await prisma.invoice.findMany({
      where: { userId: user.id },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}
