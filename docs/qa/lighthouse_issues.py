#!/usr/bin/env python3
import json
import sys

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 lighthouse_issues.py <json-file>")
        sys.exit(1)
    
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    audits = data.get('audits', {})
    
    print("Lighthouse Issues (score < 1):")
    print("=" * 80)
    
    for audit_id, audit in audits.items():
        if audit.get('score') is not None and audit['score'] < 1:
            title = audit.get('title', audit_id)
            score = audit.get('score')
            display = audit.get('displayValue', 'N/A')
            
            print(f"\n{title} (score: {score})")
            print(f"  Value: {display}")
            
            if 'description' in audit:
                desc = audit['description']
                if len(desc) > 200:
                    desc = desc[:200] + '...'
                print(f"  Description: {desc}")
            
            if 'details' in audit and 'items' in audit['details']:
                items = audit['details']['items']
                if items:
                    print(f"  Items: {len(items)} issues")
                    for i, item in enumerate(items[:5], 1):
                        if isinstance(item, dict):
                            # 간단한 문자열 표현
                            simple = {}
                            for k, v in item.items():
                                if isinstance(v, (str, int, float, bool)):
                                    simple[k] = v
                                elif isinstance(v, list) and len(v) <= 3:
                                    simple[k] = v
                                else:
                                    simple[k] = str(type(v))[8:-2]
                            print(f"    {i}. {simple}")
                        else:
                            print(f"    {i}. {item}")
            
            print("-" * 40)

if __name__ == '__main__':
    main()