#!/usr/bin/env python3
import json
import sys

def print_report(data, label):
    cats = data.get('categories', {})
    print(f"\n{'='*60}")
    print(f"Lighthouse Report: {label}")
    print('='*60)
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
    
    # 추가 문제
    print("\nOther Issues:")
    issues = []
    for audit_id, audit in audits.items():
        if audit.get('score') is not None and audit['score'] < 1 and not audit_id.startswith(('seo', 'accessibility')):
            issues.append(f"{audit['title']}: {audit.get('displayValue', 'N/A')}")
    for issue in issues[:5]:
        print(f"  - {issue}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 parse_lighthouse_full.py <json-file1> <json-file2> ...")
        sys.exit(1)
    
    for i, filename in enumerate(sys.argv[1:], start=1):
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
            print_report(data, f"{filename}")
        except FileNotFoundError:
            print(f"File not found: {filename}")
        except json.JSONDecodeError as e:
            print(f"JSON decode error in {filename}: {e}")

if __name__ == '__main__':
    main()