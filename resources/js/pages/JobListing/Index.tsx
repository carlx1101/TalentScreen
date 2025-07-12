import { useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from '@tanstack/react-table';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, ChevronDown, ArrowUpDown } from 'lucide-react';
import { BiSearchAlt } from 'react-icons/bi';
import AppLayout from '@/layouts/app-layout';
import { JobListing, type BreadcrumbItem } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Row {
  original: JobListing;
  [key: string]: any;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Job Listings',
    href: '/job-listings',
  },
];

function formatSalary(currency: string, min: number, max: number) {
  if (!currency) return '-';
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
  if (min === max) return formatter.format(min);
  return `${formatter.format(min)} - ${formatter.format(max)}`;
}

export default function JobListingIndex({ jobListings }: { jobListings: JobListing[] }) {
  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    skills: false,
    employment_benefits: false,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);

  // Table columns (no checkbox column)
  const columns = useMemo<ColumnDef<JobListing>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row }) => <div className="pl-4 font-medium">{row.getValue('title')}</div>,
        enableHiding: false,
      },
      {
        accessorKey: 'employment_type',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Employment Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row }) => row.original.employment_type,
        enableHiding: true,
        meta: {
          header: 'Employment Type',
        },
      },
      {
        accessorKey: 'mode',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Mode
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row }) => row.original.mode.join(', '),
        enableHiding: true,
        meta: {
          header: 'Mode',
        },
      },
      {
        accessorKey: 'skills',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Skills
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row }) =>
          row.original.skills && row.original.skills.length > 0
            ? row.original.skills.join(', ')
            : '-',
        enableHiding: true,
        meta: {
          header: 'Skills',
        },
      },
      {
        accessorKey: 'languages',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Languages
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row }) =>
          row.original.languages && row.original.languages.length > 0
            ? row.original.languages.join(', ')
            : '-',
        enableHiding: true,
        meta: {
          header: 'Languages',
        },
      },
      {
        id: 'salary',
        accessorKey: 'salary_min',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Salary
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row }) =>
          formatSalary(
            row.original.salary_currency,
            row.original.salary_min,
            row.original.salary_max
          ),
        enableHiding: true,
        meta: {
          header: 'Salary',
        },
      },
      {
        accessorKey: 'benefits',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Benefits
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row }) =>
          row.original.benefits && row.original.benefits.length > 0
            ? row.original.benefits.join(', ')
            : '-',
        enableHiding: true,
        meta: {
          header: 'Benefits',
        },
      },
      {
        accessorKey: 'is_active',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Active
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: { row: Row }) => (
          <span
            className={
              row.original.is_active
                ? 'text-green-600 font-semibold'
                : 'text-red-500 font-semibold'
            }
          >
            {row.original.is_active ? 'Active' : 'Inactive'}
          </span>
        ),
        enableHiding: true,
        meta: {
          header: 'Active',
        },
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }: { row: Row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableHiding: false,
      },
    ],
    []
  );

  // Table instance
  const table = useReactTable({
    data: jobListings,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      // Global search: check all string columns
      return Object.values(row.original).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
    manualPagination: false,
    manualSorting: false,
    manualFiltering: false,
  });

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Job Listings" />
      <div className="p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Job Listings</CardTitle>
                <CardDescription>
                  Browse, search, and manage your company's job listings.
                </CardDescription>
              </div>
              <Button asChild>
                <a href="/job-listings/create">Add Job Listing</a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search job listings..."
                  value={globalFilter}
                  onChange={e => setGlobalFilter(e.target.value)}
                  className="max-w-xs"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Columns <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllLeafColumns()
                      .filter(col => col.getCanHide())
                      .map(column => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={value => column.toggleVisibility(!!value)}
                        >
                          {(column.columnDef?.meta as { header: string })?.header ?? column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="rounded-md border bg-background">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <TableHead key={header.id} style={{ width: header.getSize() }}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length ? (
                      table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-64 p-0 text-center align-middle"
                        >
                          <div className="flex h-full w-full flex-col items-center justify-center py-8">
                            <BiSearchAlt className="mb-4 h-24 w-24 text-muted-foreground/40 dark:text-muted-foreground/60" />
                            <div className="mt-4 text-lg font-semibold text-muted-foreground">
                              No job listings found
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Try adjusting your search or filters.
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Showing:</span>
                  <Select value={String(pageSize)} onValueChange={val => setPageSize(Number(val))}>
                    <SelectTrigger className="h-8 w-auto">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="min-w-auto">
                      {[10, 20, 30, 50, 100].map(size => (
                        <SelectItem key={size} value={String(size)}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">
                    of {jobListings.length} rows
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
