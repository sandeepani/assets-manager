## Design Specifications
**Color Palette:**

Background: #F9FAFB (gray-50)

Cards: #FFFFFF (white)

Primary Text: #111827 (gray-900)

Secondary Text: #6B7280 (gray-500)

Border: #E5E7EB (gray-200)

Success (Current Value): #16A34A (green-600)

Danger (Depreciation): #DC2626 (red-600)

Primary Button: #2563EB (blue-600)

**Typography:**

H1: Large, bold (~32-36px)

H2: Medium-large, semi-bold (~20-24px)

H3: Medium, semi-bold (~18-20px)

Body: Regular (~14-16px)

Small: Small, regular (~12-14px)

**Spacing:**

Container padding: 32-48px

Card padding: 24px

Form field spacing: 16px

Grid gap: 24px

**Components:**

Input fields: Height 40px, rounded corners, border

Buttons: Height 40px, rounded corners, full width

Cards: White background, subtle shadow, 8px border radius

Grid: 3 columns (1 form, 2 list) on desktop, stacks on mobile

## Layout Structure
### Header Section:

Title "Asset Management"

Subtitle explaining the purpose

Clean typography on a light gray background (bg-gray-50)

### Two-Column Responsive Layout:

**Left Column (1/3 width) - Add Asset Form:**

White card with shadow

Clean input fields for:
- Asset Name
- Purchase Price (with decimal support)
- Purchase Date (date picker)
- Description (text area)
- Blue "Add Asset" button spanning full width

All form fields have proper labels and placeholders

**Right Column (2/3 width) - Asset List:**

Each asset displayed as a white card with hover effect

Asset cards show:
    - Top row: Asset name (bold) with delete icon (trash) on the right
        - Purchase date in smaller gray text
        - Description (if provided)
    - Bottom grid (4 columns on desktop, 2 on mobile):
        - Purchase Price (black)
        - Current Value (green)
        - Depreciation amount (red, with minus sign)
        - Depreciation percentage
    - Empty state message when no assets exist

### Design Features:

Minimalist color palette: whites, grays, with green (positive) and red (negative) accents

Consistent spacing and padding

Smooth hover effects and transitions

Fully responsive (stacks on mobile)

Professional typography hierarchy

Clean borders and shadows for depth
