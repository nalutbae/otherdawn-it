#!/usr/bin/env python3
import json
import sys

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 parse_lighthouse.py <json-file>")
        sys.exit(1)
    
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    cats = data.get('categories', {})
    print("Lighthouse Scores (English desktop):")
    for cat_id, cat in cats.items():
        print(f"  {cat['title']}: {cat['score']*100:.0f}/100")
    
    audits = data.get('audits', {})
    print("\nPerformance Metrics:")
    metrics = ['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time']
    for metric in metrics:
        if metric in audits:
            audit = audits[metric]
            print(f"  {audit['title']}: {audit.get('displayValue', 'N/A')}")
    
    if 'seo' in cats:
        seo_audits = {k:v for k,v in audits.items() if k.startswith('seo')}
        failed = [v['title'] for k,v in seo_audits.items() if v.get('score') is not None and v['score'] < 1]
        print(f"\nSEO Issues ({len(failed)}):")
        for issue in failed[:5]:
            print(f"  - {issue}")
    
    if 'accessibility' in cats:
        a11y_audits = {k:v for k,v in audits.items() if k.startswith('accessibility')}
        failed = [v['title'] for k,v in a11y_audits.items() if v.get('score') is not None and v['score'] < 1]
        print(f"\nAccessibility Issues ({len(failed)}):")
        for issue in failed[:5]:
            print(f"  - {issue}")

if __name__ == '__main__':
    main()