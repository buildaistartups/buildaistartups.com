import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// Define types locally
type MiniPlanInput = {
  ideaId: string
  vertical: 'ai-leadgen' | 'ai-support'
  problemStatement: string
  solution: string
  targetUsers: string
  mvpFeatures?: string[]
  launchChannels?: string[]
}

type Forecast = {
  revenueRange: {
    low: number
    high: number
  }
  timeToFirstCustomer: number
  confidenceScore: number
  assumptions: string[]
}

export async function POST(req: NextRequest) {
  try {
    const { plan, forecast }: { plan: MiniPlanInput; forecast: Forecast } = await req.json()

    // Create PDF document
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842]) // A4 size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const { width, height } = page.getSize()
    let yPosition = height - 50

    // Helper function to add text
    const addText = (text: string, size: number = 12, isBold: boolean = false) => {
      page.drawText(text, {
        x: 50,
        y: yPosition,
        size,
        font: isBold ? boldFont : font,
        color: rgb(0, 0, 0),
      })
      yPosition -= size + 5
    }

    // Title
    addText('AI Startup Plan', 24, true)
    yPosition -= 10

    // Problem & Solution
    addText('Problem Statement', 16, true)
    addText(plan.problemStatement, 12)
    yPosition -= 10

    addText('Solution', 16, true)
    addText(plan.solution, 12)
    yPosition -= 10

    addText('Target Users', 16, true)
    addText(plan.targetUsers, 12)
    yPosition -= 10

    // MVP Features
    if (plan.mvpFeatures && plan.mvpFeatures.length > 0) {
      addText('MVP Features', 16, true)
      plan.mvpFeatures.forEach(feature => {
        addText(`• ${feature}`, 12)
      })
      yPosition -= 10
    }

    // Launch Channels
    if (plan.launchChannels && plan.launchChannels.length > 0) {
      addText('Launch Channels', 16, true)
      plan.launchChannels.forEach(channel => {
        addText(`• ${channel}`, 12)
      })
      yPosition -= 10
    }

    // Forecast
    addText('Revenue Forecast', 16, true)
    addText(`Monthly Revenue (6 months): $${forecast.revenueRange.low.toLocaleString()} - $${forecast.revenueRange.high.toLocaleString()}`, 12)
    addText(`Time to First Customer: ~${forecast.timeToFirstCustomer} days`, 12)
    addText(`Confidence Score: ${forecast.confidenceScore}%`, 12)
    yPosition -= 10

    addText('Key Assumptions', 16, true)
    forecast.assumptions.forEach(assumption => {
      addText(`• ${assumption}`, 12)
    })

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save()

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ai-startup-plan.pdf"',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
