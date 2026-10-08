import { Layout } from '../ui-layout/layout';
import { useMemo, useState } from 'react';
import { PlusCircle, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { inventoryItems, stockStatus } from '@/data/demo';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function InventoryManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return inventoryItems.filter((item) => {
      const matchesQuery =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      const status = stockStatus(item);
      if (tab === 'low') return matchesQuery && status !== 'In Stock';
      return matchesQuery;
    });
  }, [searchQuery, tab]);

  const categories = useMemo(() => {
    const groups = new Map<string, { count: number; value: number; low: number }>();
    for (const item of filteredItems) {
      const current = groups.get(item.category) ?? { count: 0, value: 0, low: 0 };
      current.count += 1;
      current.value += item.quantity * item.unitPrice;
      if (stockStatus(item) !== 'In Stock') current.low += 1;
      groups.set(item.category, current);
    }
    return [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredItems]);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="page-title">Inventory Management</h2>
            <p className="text-muted-foreground">
              {inventoryItems.length} parts on the shelf for installs, repairs, and openers
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  In Stock
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Low Stock
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Out of Stock
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Sort</span>
            </Button>
          </div>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="low">Low Stock</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {tab === 'categories' && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(([name, stats]) => (
              <div key={name} className="rounded-lg border bg-card p-4">
                <div className="text-sm text-muted-foreground">{name}</div>
                <div className="mt-1 text-2xl font-semibold">{stats.count}</div>
                <div className="text-sm text-muted-foreground">
                  {currency.format(stats.value)} on hand
                  {stats.low > 0 ? ` · ${stats.low} need reorder` : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>On hand</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Unit price</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No inventory items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => {
                  const status = stockStatus(item);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            status === 'In Stock'
                              ? 'bg-lime-500 hover:bg-lime-600'
                              : status === 'Low Stock'
                              ? 'bg-amber-500 hover:bg-amber-600'
                              : 'bg-gray-500 hover:bg-gray-600'
                          }
                        >
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell>{currency.format(item.unitPrice)}</TableCell>
                      <TableCell>{item.location}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
