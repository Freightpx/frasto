import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { Plus } from '@lucide/astro';
import { beforeAll, describe, expect, test } from 'vitest';
import Dialog from '../../src/components/Dialog.astro';
import Drawer from '../../src/components/Drawer.astro';
import Dropdown from '../../src/components/Dropdown.astro';
import DropdownItem from '../../src/components/DropdownItem.astro';
import Accordion from '../../src/components/Accordion.astro';
import AccordionContent from '../../src/components/AccordionContent.astro';
import AccordionItem from '../../src/components/AccordionItem.astro';
import AccordionTrigger from '../../src/components/AccordionTrigger.astro';
import Alert from '../../src/components/Alert.astro';
import Avatar from '../../src/components/Avatar.astro';
import Badge from '../../src/components/Badge.astro';
import Breadcrumb from '../../src/components/Breadcrumb.astro';
import BreadcrumbItem from '../../src/components/BreadcrumbItem.astro';
import Button from '../../src/components/Button.astro';
import ButtonGroup from '../../src/components/ButtonGroup.astro';
import ButtonGroupSeparator from '../../src/components/ButtonGroupSeparator.astro';
import ButtonGroupText from '../../src/components/ButtonGroupText.astro';
import Collapsible from '../../src/components/Collapsible.astro';
import CollapsibleContent from '../../src/components/CollapsibleContent.astro';
import CollapsibleTrigger from '../../src/components/CollapsibleTrigger.astro';
import EmptyState from '../../src/components/EmptyState.astro';
import FormDescription from '../../src/components/FormDescription.astro';
import FormError from '../../src/components/FormError.astro';
import FormField from '../../src/components/FormField.astro';
import FormLabel from '../../src/components/FormLabel.astro';
import IconButton from '../../src/components/IconButton.astro';
import Input from '../../src/components/Input.astro';
import PageHeader from '../../src/components/PageHeader.astro';
import Pagination from '../../src/components/Pagination.astro';
import PaginationItem from '../../src/components/PaginationItem.astro';
import SearchInput from '../../src/components/SearchInput.astro';
import Select from '../../src/components/Select.astro';
import Separator from '../../src/components/Separator.astro';
import Skeleton from '../../src/components/Skeleton.astro';
import Spinner from '../../src/components/Spinner.astro';
import Stat from '../../src/components/Stat.astro';
import Status from '../../src/components/Status.astro';
import Surface from '../../src/components/Surface.astro';
import Popover from '../../src/components/Popover.astro';
import Switch from '../../src/components/Switch.astro';
import Tab from '../../src/components/Tab.astro';
import TabPanel from '../../src/components/TabPanel.astro';
import Tabs from '../../src/components/Tabs.astro';
import ThemeSwitch from '../../src/components/ThemeSwitch.astro';
import ToastRegion from '../../src/components/ToastRegion.astro';
import Table from '../../src/components/Table.astro';
import Textarea from '../../src/components/Textarea.astro';
import Tooltip from '../../src/components/Tooltip.astro';
import Checkbox from '../../src/components/Checkbox.astro';
import Radio from '../../src/components/Radio.astro';

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

describe('Gate 3 rendered contracts', () => {
  test('Pagination renders a named native landmark and ordered list', async () => {
    const html = await container.renderToString(Pagination, {
      props: { label: 'Customer results' },
      slots: { summary: '26–50 of 128 customers', default: '<li>Page controls</li>' },
    });

    expect(html).toContain('<nav');
    expect(html).toContain('aria-label="Customer results"');
    expect(html).toContain('<ol');
    expect(html).toContain('data-frasto-pagination-summary');
    expect(html).toContain('26–50 of 128 customers');
  });

  test('PaginationItem gives current, disabled, linked, and gap items distinct semantics', async () => {
    const current = await container.renderToString(PaginationItem, {
      props: { current: true, href: '?page=2', label: 'Current page, page 2' },
      slots: { default: '2' },
    });
    const disabled = await container.renderToString(PaginationItem, {
      props: { disabled: true, kind: 'previous' },
      slots: { default: 'Previous' },
    });
    const linked = await container.renderToString(PaginationItem, {
      props: { href: '?page=3', label: 'Go to page 3', linkAttributes: { rel: 'next' } },
      slots: { default: '3' },
    });
    const gap = await container.renderToString(PaginationItem, {
      props: { kind: 'gap' },
      slots: { default: '…' },
    });

    expect(current).toContain('aria-current="page"');
    expect(current).not.toContain('href="?page=2"');
    expect(disabled).toContain('aria-disabled="true"');
    expect(disabled).not.toContain('<a');
    expect(linked).toContain('href="?page=3"');
    expect(linked).toContain('rel="next"');
    expect(gap).toContain('aria-hidden="true"');
  });

  test('Stat uses description-list semantics and keeps trend meaning visible', async () => {
    const html = await container.renderToString(Stat, {
      props: {
        label: 'Active customers',
        value: '112',
        change: 'Up 8 this month',
        changeTone: 'positive',
        description: 'From 128 total records',
      },
    });

    expect(html).toContain('<dl');
    expect(html).toContain('<dt');
    expect(html).toContain('<dd');
    expect(html).toContain('Active customers');
    expect(html).toContain('Up 8 this month');
    expect(html).toContain('data-tone="positive"');
  });
});

describe('Gate 4 rendered contracts', () => {
  test('Accordion family preserves readable server content and authored controls', async () => {
    const root = await container.renderToString(Accordion, {
      props: { type: 'multiple', defaultValue: ['shipping'], collapsible: true },
      slots: { default: '<div>Server-readable accordion content</div>' },
    });
    const item = await container.renderToString(AccordionItem, {
      props: { value: 'shipping', disabled: true },
      slots: { default: 'Item content' },
    });
    const trigger = await container.renderToString(AccordionTrigger, { slots: { default: 'Shipping' } });
    const content = await container.renderToString(AccordionContent, { slots: { default: 'Two business days' } });

    expect(root).toContain('data-type="multiple"');
    expect(root).toContain('Server-readable accordion content');
    expect(item).toContain('data-disabled="true"');
    expect(trigger).toContain('type="button"');
    expect(content).not.toContain('hidden');
    expect(content).toContain('Two business days');
  });

  test('Collapsible family preserves content before progressive enhancement', async () => {
    const root = await container.renderToString(Collapsible, {
      props: { defaultOpen: true, disabled: false },
      slots: { default: '<p>Deployment details</p>' },
    });
    const trigger = await container.renderToString(CollapsibleTrigger, { slots: { default: 'Show details' } });
    const content = await container.renderToString(CollapsibleContent, { slots: { default: 'Production is ready' } });

    expect(root).toContain('data-default-open="true"');
    expect(trigger).toContain('type="button"');
    expect(content).not.toContain('hidden');
    expect(content).toContain('Production is ready');
  });

  test('Alert is static feedback without a forced live-region role', async () => {
    const html = await container.renderToString(Alert, {
      props: { title: 'Review account details', tone: 'warning' },
      slots: { default: 'Confirm the billing contact.', action: '<button type="button">Review</button>' },
    });

    expect(html).toContain('data-frasto-alert');
    expect(html).toContain('data-tone="warning"');
    expect(html).toContain('Review account details');
    expect(html).toContain('data-frasto-alert-action');
    expect(html).toContain('Review</button>');
    expect(html).not.toContain('role="alert"');
  });

  test('ButtonGroup family exposes a labelled group and decorative separator', async () => {
    const group = await container.renderToString(ButtonGroup, {
      props: { label: 'Save options', orientation: 'vertical' },
      slots: { default: '<button>Save</button>' },
    });
    const text = await container.renderToString(ButtonGroupText, { slots: { default: 'Rows' } });
    const separator = await container.renderToString(ButtonGroupSeparator);

    expect(group).toContain('role="group"');
    expect(group).toContain('aria-label="Save options"');
    expect(group).toContain('data-orientation="vertical"');
    expect(text).toContain('Rows');
    expect(separator).toContain('aria-hidden="true"');
  });
});

describe('Phase 5 high-risk rendered contracts', () => {
  test('Drawer renders native modal relationships and useful server content', async () => {
    const html = await container.renderToString(Drawer, {
      props: { id: 'customer-drawer', title: 'Customer details', description: 'Northstar Goods account context', side: 'left', size: 'sm' },
      slots: { trigger: '<button type="button">View customer</button>', default: '<p>Active customer</p>' },
    });

    expect(html).toContain('<dialog');
    expect(html).toContain('aria-labelledby="customer-drawer-title"');
    expect(html).toContain('aria-describedby="customer-drawer-description"');
    expect(html).toContain('data-side="left"');
    expect(html).toContain('Active customer');
  });

  test('Dropdown renders a named hidden menu and disabled items are unavailable', async () => {
    const root = await container.renderToString(Dropdown, {
      props: { id: 'customer-actions', label: 'Customer actions' },
      slots: { trigger: '<button type="button">Actions</button>', default: '<button role="menuitem">Edit</button>' },
    });
    const disabledItem = await container.renderToString(DropdownItem, {
      props: { disabled: true, href: '/archive' },
      slots: { default: 'Archive customer' },
    });

    expect(root).toContain('role="menu"');
    expect(root).toContain('aria-label="Customer actions"');
    expect(root).toContain('hidden');
    expect(disabledItem).toContain('aria-disabled="true"');
    expect(disabledItem).not.toContain('href="/archive"');
  });

  test('Popover and Tooltip render labelled relationships before enhancement', async () => {
    const popover = await container.renderToString(Popover, {
      props: { id: 'sync-details', label: 'Sync details' },
      slots: { trigger: '<button type="button">Sync status</button>', default: '<p>Customer data is current.</p>' },
    });
    const tooltip = await container.renderToString(Tooltip, {
      props: { id: 'export-help', content: 'Exports the current filtered result', delay: 0 },
      slots: { default: '<button type="button">Export</button>' },
    });

    expect(popover).toContain('role="dialog"');
    expect(popover).toContain('aria-label="Sync details"');
    expect(popover).toContain('Customer data is current.');
    expect(tooltip).toContain('role="tooltip"');
    expect(tooltip).toContain('Exports the current filtered result');
  });

  test('Tabs preserve readable panels and native tab semantics before enhancement', async () => {
    const root = await container.renderToString(Tabs, {
      props: { label: 'Account sections', defaultValue: 'overview' },
      slots: { tab: '<button role="tab">Overview</button>', panel: '<div role="tabpanel">Account overview content.</div>' },
    });
    const tab = await container.renderToString(Tab, { props: { value: 'overview' }, slots: { default: 'Overview' } });
    const panel = await container.renderToString(TabPanel, { props: { value: 'overview' }, slots: { default: 'Account overview content.' } });

    expect(root).toContain('role="tablist"');
    expect(root).toContain('aria-label="Account sections"');
    expect(tab).toContain('aria-selected="false"');
    expect(panel).not.toContain('hidden');
  });

  test('Segmented Tabs render a square moving-indicator hook without changing semantics', async () => {
    const html = await container.renderToString(Tabs, {
      props: { label: 'Communication sections', defaultValue: 'chat', variant: 'segmented' },
      slots: { tab: '<button role="tab">Chats</button>', panel: '<div role="tabpanel">Recent chats</div>' },
    });

    expect(html).toContain('role="tablist"');
    expect(html).toContain('data-variant="segmented"');
    expect(html).toContain('data-frasto-tab-indicator');
    expect(html).toContain('aria-hidden="true"');
  });

  test('ThemeSwitch renders a labelled two-button pressed-state group', async () => {
    const html = await container.renderToString(ThemeSwitch, {
      props: {
        label: 'Application color theme',
        lightLabel: 'Day',
        darkLabel: 'Night',
        storageKey: 'product-theme',
        variant: 'segmented',
      },
    });

    expect(html).toContain('data-frasto-theme-switch');
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Application color theme"');
    expect(html).toContain('data-storage-key="product-theme"');
    expect(html).toContain('Day');
    expect(html).toContain('Night');
    expect(html.match(/aria-pressed="false"/g)).toHaveLength(2);
  });

  test('ThemeSwitch renders compact and animated setting variants', async () => {
    const compact = await container.renderToString(ThemeSwitch, {
      props: { label: 'Compact theme', variant: 'segmented-icons' },
    });
    const animatedIcon = await container.renderToString(ThemeSwitch, {
      props: { label: 'Icon theme', variant: 'animated-icon' },
    });
    const defaultAnimatedLabel = await container.renderToString(ThemeSwitch, {
      props: { label: 'Labelled theme' },
    });

    expect(compact).toContain('data-variant="segmented-icons"');
    expect(compact).toContain('aria-label="Light"');
    expect(compact).toContain('aria-label="Dark"');
    expect(animatedIcon).toContain('data-variant="animated-icon"');
    expect(animatedIcon).toContain('data-frasto-theme-toggle');
    expect(defaultAnimatedLabel).toContain('data-variant="animated-icon-label"');
    expect(defaultAnimatedLabel).toContain('data-frasto-theme-switch-label');
  });

  test('ToastRegion renders one named empty notification region before enhancement', async () => {
    const html = await container.renderToString(ToastRegion, {
      props: {
        position: 'top-center',
        label: 'Account notifications',
        dismissLabel: 'Close account notification',
      },
    });

    expect(html).toContain('data-frasto-toast-region');
    expect(html).toContain('role="region"');
    expect(html).toContain('aria-label="Account notifications"');
    expect(html).toContain('data-position="top-center"');
    expect(html).toContain('data-dismiss-label="Close account notification"');
    expect(html).toContain('data-frasto-toast-list');
    expect(html).not.toContain('role="status"');
    expect(html).not.toContain('role="alert"');
  });

  test('Switch remains a native named checkbox with switch semantics', async () => {
    const html = await container.renderToString(Switch, {
      props: { name: 'activity', checked: true, required: true },
      slots: { default: 'Show account activity' },
    });

    expect(html).toContain('type="checkbox"');
    expect(html).toContain('role="switch"');
    expect(html).toContain('name="activity"');
    expect(html).toContain('checked');
    expect(html).toContain('required');
    expect(html).toContain('Show account activity');
  });
});

describe('Phase 5 native-control rendered contracts', () => {
  test('Button keeps native defaults and exposes one loading label', async () => {
    const idle = await container.renderToString(Button, {
      slots: { default: 'Save changes' },
    });
    const loading = await container.renderToString(Button, {
      props: { loading: true, loadingLabel: 'Saving changes' },
      slots: { default: 'Save changes' },
    });

    expect(idle).toContain('type="button"');
    expect(loading).toContain('disabled');
    expect(loading).toContain('aria-busy="true"');
    expect(loading).toContain('aria-hidden="true"');
    expect(loading).toContain('Saving changes');
  });

  test('IconButton always renders an explicit accessible name', async () => {
    const button = await container.renderToString(IconButton, {
      props: { icon: Plus, label: 'Add customer', loading: true },
    });

    expect(button).toContain('aria-label="Add customer"');
    expect(button).toContain('aria-busy="true"');
    expect(button).toContain('disabled');
  });

  test('Input, Textarea, and Select preserve native attributes and invalid semantics', async () => {
    const input = await container.renderToString(Input, {
      props: { id: 'email', name: 'email', type: 'email', required: true, invalid: true, 'aria-describedby': 'email-error' },
    });
    const textarea = await container.renderToString(Textarea, {
      props: { name: 'notes', value: 'Existing context', readonly: true, rows: 5 },
    });
    const select = await container.renderToString(Select, {
      props: { name: 'status', required: true, invalid: true },
      slots: { default: '<option value="active">Active</option>' },
    });

    expect(input).toContain('type="email"');
    expect(input).toContain('required');
    expect(input).toContain('aria-invalid="true"');
    expect(input).toContain('aria-describedby="email-error"');
    expect(textarea).toContain('readonly');
    expect(textarea).toContain('rows="5"');
    expect(textarea).toContain('Existing context');
    expect(select).toContain('<select');
    expect(select).toContain('name="status"');
    expect(select).toContain('aria-invalid="true"');
    expect(select).toContain('<option value="active">Active</option>');
  });

  test('Checkbox and Radio remain labelled native inputs', async () => {
    const checkbox = await container.renderToString(Checkbox, {
      props: { name: 'notifications', value: 'enabled', checked: true, required: true },
      slots: { default: 'Notify the account owner' },
    });
    const radio = await container.renderToString(Radio, {
      props: { name: 'cadence', value: 'annual', checked: true },
      slots: { default: 'Annual' },
    });

    expect(checkbox).toContain('type="checkbox"');
    expect(checkbox).toContain('checked');
    expect(checkbox).toContain('Notify the account owner');
    expect(radio).toContain('type="radio"');
    expect(radio).toContain('name="cadence"');
    expect(radio).toContain('Annual');
  });

  test('FormField helpers preserve explicit authored relationships', async () => {
    const field = await container.renderToString(FormField, {
      props: { as: 'fieldset', disabled: true, invalid: true },
      slots: { default: '<legend>Account options</legend><input name="option">' },
    });
    const label = await container.renderToString(FormLabel, {
      props: { for: 'account-email', required: true },
      slots: { default: 'Email' },
    });
    const description = await container.renderToString(FormDescription, {
      props: { id: 'email-help' },
      slots: { default: 'Used for account notices.' },
    });
    const error = await container.renderToString(FormError, {
      props: { id: 'email-error', announce: true },
      slots: { default: 'Enter a valid email address.' },
    });

    expect(field).toContain('<fieldset');
    expect(field).toContain('disabled');
    expect(field).toContain('data-invalid="true"');
    expect(label).toContain('for="account-email"');
    expect(label).toContain('aria-hidden="true"');
    expect(description).toContain('id="email-help"');
    expect(error).toContain('role="alert"');
  });
});

describe('Phase 5 static-component rendered contracts', () => {
  test('Avatar distinguishes image and named fallback semantics', async () => {
    const image = await container.renderToString(Avatar, {
      props: { src: '/maya.svg', alt: 'Maya Chen', loading: 'eager' },
    });
    const fallback = await container.renderToString(Avatar, {
      props: { fallback: 'MC', label: 'Maya Chen' },
    });

    expect(image).toContain('<img');
    expect(image).toContain('alt="Maya Chen"');
    expect(image).toContain('loading="eager"');
    expect(fallback).toContain('role="img"');
    expect(fallback).toContain('aria-label="Maya Chen"');
    expect(fallback).toContain('aria-hidden="true"');
  });

  test('Badge and Status keep visible text as the source of meaning', async () => {
    const badge = await container.renderToString(Badge, {
      props: { tone: 'positive', variant: 'outline' },
      slots: { default: 'Active' },
    });
    const status = await container.renderToString(Status, {
      props: { tone: 'warning' },
      slots: { default: 'Needs review' },
    });

    expect(badge).toContain('data-tone="positive"');
    expect(badge).toContain('Active');
    expect(badge).not.toContain('role="status"');
    expect(status).toContain('Needs review');
    expect(status).toContain('aria-hidden="true"');
  });

  test('Skeleton and Spinner enforce their loading announcement policies', async () => {
    const skeleton = await container.renderToString(Skeleton, {
      props: { variant: 'control', animation: 'none' },
    });
    const decorativeSpinner = await container.renderToString(Spinner);
    const labelledSpinner = await container.renderToString(Spinner, {
      props: { label: 'Loading invoices' },
    });
    const variantSpinner = await container.renderToString(Spinner, {
      props: {
        variant: 'typewriter',
        size: 'lg',
        class: 'consumer-spinner',
        'data-consumer': 'fixture',
      },
    });

    expect(skeleton).toContain('aria-hidden="true"');
    expect(skeleton).toContain('data-animation="none"');
    expect(decorativeSpinner).toContain('aria-hidden="true"');
    expect(decorativeSpinner).toContain('data-variant="orbit"');
    expect(decorativeSpinner.match(/data-frasto-spinner-cell/g)).toHaveLength(9);
    expect(labelledSpinner).toContain('role="status"');
    expect(labelledSpinner).toContain('aria-label="Loading invoices"');
    expect(labelledSpinner.match(/aria-hidden="true"/g)).toHaveLength(9);
    expect(variantSpinner).toContain('data-variant="typewriter"');
    expect(variantSpinner).toContain('data-size="lg"');
    expect(variantSpinner).toContain('consumer-spinner');
    expect(variantSpinner).toContain('data-consumer="fixture"');
  });

  test('Breadcrumb keeps landmark, link, and current-page semantics explicit', async () => {
    const root = await container.renderToString(Breadcrumb, {
      props: { label: 'Customer location' },
      slots: { default: '<li>Workspace</li>' },
    });
    const linked = await container.renderToString(BreadcrumbItem, {
      props: { href: '/customers', linkAttributes: { rel: 'up' } },
      slots: { default: 'Customers' },
    });
    const current = await container.renderToString(BreadcrumbItem, {
      props: { current: true, href: '/customers/northstar' },
      slots: { default: 'Northstar Goods' },
    });

    expect(root).toContain('<nav');
    expect(root).toContain('aria-label="Customer location"');
    expect(root).toContain('<ol');
    expect(linked).toContain('href="/customers"');
    expect(linked).toContain('rel="up"');
    expect(current).toContain('aria-current="page"');
    expect(current).not.toContain('href="/customers/northstar"');
  });

  test('Surface and Separator preserve authored structural semantics', async () => {
    const surface = await container.renderToString(Surface, {
      props: { as: 'section', variant: 'outlined', padding: 'lg', 'aria-label': 'Account summary' },
      slots: { default: 'Northstar Goods' },
    });
    const vertical = await container.renderToString(Separator, {
      props: { orientation: 'vertical' },
    });
    const decorative = await container.renderToString(Separator, {
      props: { decorative: true },
    });

    expect(surface).toContain('<section');
    expect(surface).toContain('aria-label="Account summary"');
    expect(surface).toContain('data-variant="outlined"');
    expect(vertical).toContain('role="separator"');
    expect(vertical).toContain('aria-orientation="vertical"');
    expect(decorative).toContain('role="presentation"');
  });
});

describe('Gate 2 rendered contracts', () => {
  test('SearchInput preserves native search and label semantics before enhancement', async () => {
    const html = await container.renderToString(SearchInput, {
      props: { id: 'customer-search', label: 'Search customers', name: 'query', value: 'Northstar' },
    });

    expect(html).toContain('<label');
    expect(html).toContain('for="customer-search"');
    expect(html).toContain('type="search"');
    expect(html).toContain('name="query"');
    expect(html).toContain('value="Northstar"');
    expect(html).toContain('data-frasto-search-clear');
  });

  test('Table keeps native structure, caption, density, and overflow contract', async () => {
    const html = await container.renderToString(Table, {
      props: { caption: 'Customer accounts', density: 'compact', layout: 'fixed', minWidth: '40rem' },
      slots: { default: '<thead><tr><th scope="col">Customer</th></tr></thead><tbody><tr><td>Northstar Goods</td></tr></tbody>' },
    });

    expect(html).toContain('data-frasto-table-container');
    expect(html).toContain('--frasto-table-min-width: 40rem');
    expect(html).toContain('<table');
    expect(html).toContain('data-density="compact"');
    expect(html).toContain('data-layout="fixed"');
    expect(html).toContain('<caption');
    expect(html).toContain('Customer accounts');
    expect(html).toContain('<thead>');
  });

  test('PageHeader renders the requested heading and keeps authored slot order', async () => {
    const html = await container.renderToString(PageHeader, {
      props: { title: 'Customer accounts', description: 'Manage long-lived customer relationships.', eyebrow: 'CRM / CUSTOMERS', headingLevel: 2 },
      slots: {
        breadcrumb: '<nav aria-label="Breadcrumb">Workspace</nav>',
        metadata: '<span>128 records</span>',
        actions: '<button type="button">Add customer</button>',
      },
    });

    expect(html).toContain('<h2');
    expect(html).toContain('Customer accounts');
    expect(html.indexOf('Workspace')).toBeLessThan(html.indexOf('Customer accounts'));
    expect(html.indexOf('128 records')).toBeLessThan(html.indexOf('Add customer'));
  });

  test('EmptyState renders structural hierarchy and authored actions', async () => {
    const html = await container.renderToString(EmptyState, {
      props: { as: 'section', title: 'No invoices yet', description: 'Invoices will appear after the first billing cycle.', headingLevel: 3, align: 'center' },
      slots: {
        actions: '<button type="button">Create invoice</button>',
        footer: '<span>Contact an administrator for access.</span>',
      },
    });

    expect(html).toContain('<section');
    expect(html).toContain('<h3');
    expect(html).toContain('No invoices yet');
    expect(html).toContain('Create invoice');
    expect(html).toContain('Contact an administrator for access.');
  });

  test('Dialog renders native modal relationships and enhancement hooks', async () => {
    const html = await container.renderToString(Dialog, {
      props: { id: 'archive-dialog', title: 'Archive customer', description: 'This removes the customer from active results.' },
      slots: {
        trigger: '<button type="button">Archive</button>',
        default: '<p>Confirm this action.</p>',
        footer: '<button type="button">Confirm</button>',
      },
    });

    expect(html).toContain('<dialog');
    expect(html).toContain('id="archive-dialog"');
    expect(html).toContain('aria-labelledby="archive-dialog-title"');
    expect(html).toContain('aria-describedby="archive-dialog-description"');
    expect(html).toContain('data-frasto-dialog-close');
  });
});
